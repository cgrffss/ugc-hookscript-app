import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add generic helpers for the application logic
export async function createGenerationEntry(userId: string, productName: string, prompt: string, imageUrl: string) {
  const { data, error } = await supabase
    .from('generations')
    .insert([
      { 
        user_id: userId, 
        product_name: productName, 
        prompt: prompt, 
        input_image: imageUrl,
        status: 'processing'
      }
    ])
    .select()

  return { data, error }
}
