import { supabase } from "../database/supabase";

export async function getDataKasbonByIdUser(id: string, status: string) {
  const { data, error } = await supabase
    .from("kasbon")
    .select("*")
    .eq("id_karyawan", id)
    .eq("status", status);
  return { data, error };
}

export async function getTotalKasbonByIdUser(id: string) {
  const { data, error } = await supabase
    .from("kasbon")
    .select("nominal, status")
    .eq("user_id", id)
    .eq("status", "disetujui");
  const jumlah = data?.reduce((total, item) => total + item.nominal, 0);
  return { jumlah, error };
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

export async function updateNominalkasbon(id: string, nominal: number) {
  const { jumlah } = await getTotalKasbonByIdUser(id);
  const totalKasbon = nominal + (jumlah || 0);
  const { data, error } = await supabase
    .from("users")
    .update({ kasbon: totalKasbon })
    .eq("id", id);
  return { data, error };
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

  console.log("SERVICE DATA:", data);
  console.log("SERVICE ERROR:", error);

  return { data, error };
}
