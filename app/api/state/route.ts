import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/src/lib/supabaseAdmin";
import { defaultState } from "@/src/lib/defaultState";

const ownerId = process.env.DISCIPLINE_OS_OWNER_ID ?? "default";

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json({ state: defaultState, error: "Missing Supabase env vars" }, { status: 200 });
  }

  const { data, error } = await supabaseAdmin
    .from("discipline_os_state")
    .select("state")
    .eq("owner_id", ownerId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ state: defaultState, error: error.message }, { status: 200 });
  }

  return NextResponse.json({ state: data?.state ?? defaultState }, { status: 200 });
}

export async function POST(request: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }

  const payload = (await request.json()) as { state?: unknown };
  const state = payload?.state ?? defaultState;

  const { error } = await supabaseAdmin.from("discipline_os_state").upsert(
    {
      owner_id: ownerId,
      state,
      updated_at: new Date().toISOString()
    },
    { onConflict: "owner_id" }
  );

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
