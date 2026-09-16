import { supabase } from "../database/supabase";
import { getUserById } from "./AuthService";

export async function getDataKasbonByIdUser(id: string, status: string) {
  const { data, error } = await supabase
    .from("kasbon")
    .select("*")
    .eq("id_karyawan", id)
    .eq("status", status);
  return { data, error };
}

export async function getAllDataKasbon(
  status: string[] = ["disetujui", "ditolak"],
  userId?: string,
  tgl_mulai?: Date,
  tgl_selesai?: Date,
) {
  let statusQuesry = supabase
    .from("kasbon")
    .select("*, users!kasbon_id_karyawan_fkey(nama_user, role)");
  if (status) {
    statusQuesry = statusQuesry.in("status", status);
  }
  if (userId) {
    statusQuesry = statusQuesry.eq("id_karyawan", userId);
  }
  if (tgl_mulai && tgl_selesai) {
    const startDate = new Date(tgl_mulai);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(tgl_selesai);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);

    statusQuesry = statusQuesry
      .gte("tanggal_pengajuan", startDate.toISOString())
      .lt("tanggal_pengajuan", endDate.toISOString());
  }
  if (tgl_mulai && !tgl_selesai) {
    const startDate = new Date(tgl_mulai);
    startDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + 1);

    statusQuesry = statusQuesry
      .gte("tanggal_pengajuan", startDate.toISOString())
      .lt("tanggal_pengajuan", nextDate.toISOString());
  }
  if (!tgl_mulai && tgl_selesai) {
    const endDate = new Date(tgl_selesai);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);

    statusQuesry = statusQuesry.lt("tanggal_pengajuan", endDate.toISOString());
  }
  const { data, error } = await statusQuesry;

  if (data) {
    return {
      data: data,
      message: "Berhasil mengambil data kasbon",
      status: 200,
    };
  } else {
    return {
      data: [],
      message: "error" + error,
      status: 500,
    };
  }
}

export async function approveKasbon(
  id: string,
  status: string,
  description: string,
  id_atasan: string,
) {
  try {
    const { error } = await supabase
      .from("kasbon")
      .update({
        status: status,
        catatan_atasan: description,
        id_atasan: id_atasan,
        tanggal_keputusan: new Date(),
      })
      .eq("id", id);

    if (error) {
      console.error("Gagal mengubah status kasbon:", error);
      return {
        message: "Gagal mengubah status kasbon",
        status: 500,
      };
    }

    if (status === "disetujui") {
      await totalKasbonByIdUser(id);
    }

    return {
      message: "Berhasil mengubah status kasbon",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Terjadi kesalahan saat mengubah status kasbon",
      status: 500,
    };
  }
}

export async function addKasbon(data_kasbon: any) {
  console.log(data_kasbon);
  const { error } = await supabase.from("kasbon").insert({
    id_karyawan: data_kasbon.user_id,
    nominal: data_kasbon.nominal,
    alasan: data_kasbon.keterangan,
    status: "diajukan",
    tanggal_pengajuan: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });

  if (error) {
    return {
      status: 500,
      message: "Gagal mengajukan kasbon",
    };
  }

  return {
    status: 200,
    message: "Berhasil megajukan kasbon",
  };
}

export async function filterDataKasbon(
  userId?: string,
  tgl_mulai?: Date,
  tgl_selesai?: Date,
  status?: string,
) {
  let query = supabase.from("kasbon").select("*").eq("id_karyawan", userId);

  // HANYA TANGGAL MULAI
  if (tgl_mulai && !tgl_selesai) {
    const startDate = new Date(tgl_mulai);
    startDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + 1);

    query = query
      .gte("tanggal_pengajuan", startDate.toISOString())
      .lt("tanggal_pengajuan", nextDate.toISOString());
  }

  // ADA TANGGAL MULAI DAN SELESAI
  if (tgl_mulai && tgl_selesai) {
    const startDate = new Date(tgl_mulai);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(tgl_selesai);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);

    query = query
      .gte("tanggal_pengajuan", startDate.toISOString())
      .lt("tanggal_pengajuan", endDate.toISOString());
  }

  // HANYA TANGGAL SELESAI
  if (!tgl_mulai && tgl_selesai) {
    const endDate = new Date(tgl_selesai);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);

    query = query.lt("tanggal_pengajuan", endDate.toISOString());
  }

  // STATUS
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  return { data, error };
}

export async function totalKasbonByIdUser(id: string) {
  const dataKasbon = await supabase.from("kasbon").select("*").eq("id", id);
  const user = await getUserById(dataKasbon.data?.[0].id_karyawan);
  if (!user.data) {
    return {
      message: "User tidak ditemukan",
      error: true,
    };
  }
  const totalKasbon = user.data.kasbon + dataKasbon.data?.[0].nominal;
  const { error } = await supabase
    .from("users")
    .update({ kasbon: totalKasbon })
    .eq("id", user.data.id);
  return { totalKasbon, error: error };
}
