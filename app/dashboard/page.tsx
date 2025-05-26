import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
 
    redirect("/dashboard/guest");
  } else {
   
    redirect("/dashboard/user");
  }


  return null;
}
