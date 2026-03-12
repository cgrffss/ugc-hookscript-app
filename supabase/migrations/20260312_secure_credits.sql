-- Function to deduct credits on generation
CREATE OR REPLACE FUNCTION public.handle_generation_credit_deduction()
RETURNS TRIGGER AS $$
DECLARE
    user_credits INT;
BEGIN
    -- Get current credits for the user
    SELECT credits INTO user_credits
    FROM public.profiles
    WHERE id = NEW.user_id;

    -- Check if user has credits
    IF user_credits IS NULL OR user_credits <= 0 THEN
        RAISE EXCEPTION 'Yetersiz kredi! Lütfen paketinizi yükseltin.';
    END IF;

    -- Deduct 1 credit
    UPDATE public.profiles
    SET credits = credits - 1
    WHERE id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run before inserting a new generation
-- We use BEFORE INSERT so we can cancel the operation if credits are 0
DROP TRIGGER IF EXISTS on_generation_insert ON public.generations;
CREATE TRIGGER on_generation_insert
BEFORE INSERT ON public.generations
FOR EACH ROW
EXECUTE FUNCTION public.handle_generation_credit_deduction();
