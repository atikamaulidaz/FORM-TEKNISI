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

  // Filter tanggal mulai kalau diisi
  if (tgl_mulai) {
    query = query.gte("tanggal_pengajuan", tgl_mulai.toISOString());
  }

  // Filter tanggal selesai kalau diisi
  if (tgl_selesai) {
    query = query.lte("tanggal_pengajuan", tgl_selesai.toISOString());
  }

  // Filter status kalau diisi
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  return { data, error };
}
