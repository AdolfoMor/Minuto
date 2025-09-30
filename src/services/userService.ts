import { supabase } from '../supabaseClient'

// CREATE
export async function createUser(nombre: string, email: string, telefono?: string) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ nombre, email, telefono }])
    .select()

  if (error) throw error
  return data
}

// READ
export async function getUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')

  if (error) throw error
  return data
}

// UPDATE
export async function updateUser(id: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

// DELETE
export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}
