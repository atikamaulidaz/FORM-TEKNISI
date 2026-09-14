import { supabase } from "../database/supabase";

export async function registerUser(form: any) {
    try {
        // const { data, error } = await supabase.auth.signUp({
        //     email: `${form.username}@gmail.com`,
        //     password: form.password,
        // });

        // if (error) {
        //     throw error;
        // }

        const { data: dataInsert, error: errorInsert } = await supabase
            .from("users")
            .insert({
                username: form.username,
                nama_user: form.nama_user,
                role: form.role,
                kasbon: form.kasbon,
                password: form.password
            });

        return {
            message: "User berhasil terdaftar",
            error: false
        }
    } catch (error) {
        return {
            message: "User gagal terdaftar",
            error: true
        }
    }
}

export async function loginUser(form: any) {
    try {
        // const { data, error } = await supabase.auth.signInWithPassword({
        //     email: `${form.username}@gmail.com`,
        //     password: form.password,
        // });

        // if (error) {
        //     throw error;
        // }

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("username", form.username)
            .eq("password", form.password)
            .single();

        if (error) {
            throw error;
        }

        return {
            message: "User berhasil login",
            error: false,
            data: data
        }
    } catch (error) {
        return {
            message: "User gagal login",
            error: true
        }
    }
}
