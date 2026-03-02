import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Deadline = { title: string; date: string };

const daysUntil = (date: string) => {
  const diff = new Date(date).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

Deno.serve(async () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const telegramToken = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
  const telegramChatId = Deno.env.get("TELEGRAM_CHAT_ID") ?? "";

  if (!supabaseUrl || !serviceRoleKey || !telegramToken || !telegramChatId) {
    return new Response("Missing env vars", { status: 400 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data } = await supabase.from("discipline_os_state").select("state");

  const deadlines: Deadline[] = [];
  data?.forEach((row: { state?: { syllabus?: { deadlines?: Deadline[] } } }) => {
    const list = row.state?.syllabus?.deadlines ?? [];
    deadlines.push(...list);
  });

  const dueSoon = deadlines.filter((item) => {
    const days = daysUntil(item.date);
    return days === 14 || days === 5;
  });

  for (const deadline of dueSoon) {
    const message = `Hey Jesus! Just a heads up, your ${deadline.title} is in ${daysUntil(
      deadline.date
    )} days. You got this! 🚀`;
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message
      })
    });
  }

  return new Response(JSON.stringify({ sent: dueSoon.length }), {
    headers: { "Content-Type": "application/json" }
  });
});
