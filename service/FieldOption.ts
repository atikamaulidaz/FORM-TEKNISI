import { supabase } from "../database/supabase";


export async function getFieldOption() {
    const { data: survey_forms, error } = await supabase
        .from("survey_forms")
        .select("*");

    return { survey_forms, error };
}


export async function addFieldOption(data_field: any) {
    console.log("Data field option : ", data_field);
    const { data, error } = await supabase
        .from("survey_forms")
        .insert(data_field);
    console.log("Data field option : ", data);
    console.log("Error field option : ", error);
    return { data, error };
}


export async function deleteFieldOption(id: string) {
    const { data, error } = await supabase
        .from("survey_forms")
        .delete()
        .eq("id", id);
    return { data, error };
}

export async function getFieldOptionById(id: string) {
    const { data, error } = await supabase.from("survey_forms").select().eq("id", id).single();
    return { data, error }
}

export async function updateFieldOption(data_field: any) {
    console.log("Data field option : ", data_field);
    const { data, error } = await supabase
        .from("survey_forms")
        .update(data_field)
        .eq("id", data_field.id);
    console.log("Data field option : ", data);
    console.log("Error field option : ", error);
    return { data, error };
}