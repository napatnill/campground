import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/layout/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getUserProfile from "@/lib/user/getUserProfile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dbConnect } from "@/db/dbConnect";
import Campground from "@/db/models/Campground";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateCamp() {
  // server action
  const addCampground = async (addCampgroundForm: FormData) => {
    "use server";
    // get data from the form below
    const name = addCampgroundForm.get("name");
    const address = addCampgroundForm.get("address");
    const district = addCampgroundForm.get("district");
    const province = addCampgroundForm.get("province");
    const postalcode = addCampgroundForm.get("postalcode");
    const tel = addCampgroundForm.get("tel");
    const picture = addCampgroundForm.get("picture");

    // connect to database (create campground object following the schema)
    try {
      await dbConnect();
      await Campground.create({
        name,
        address,
        district,
        province,
        postalcode,
        tel,
        picture
      });
    } catch (error) {
      console.error(error);
    }

    // revalidateTag campgrounds then go to landing page
    revalidateTag("campgrounds");
    redirect("/");
  };

  // server session
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);

  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden bg-background">
        <Navbar title="Create Campground" />
        <main className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
            {/* admin form */}
            {profile.data.role === "admin" ? (
              <form action={addCampground} className="space-y-6">
                <div className="text-2xl font-semibold text-center">Create Campground</div>

                {/* Form fields */}
                {[
                  { id: "name", label: "Name", type: "text" },
                  { id: "address", label: "Address", type: "text" },
                  { id: "district", label: "District", type: "text" },
                  { id: "province", label: "Province", type: "text" },
                  { id: "postalcode", label: "Postal Code", type: "text" },
                  { id: "tel", label: "Tel", type: "text" },
                  { id: "picture", label: "Picture URL", type: "text" }
                ].map(({ id, label, type }) => (
                  <div key={id} className="flex flex-col">
                    {/* Label */}
                    <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>

                    {/* Input */}
                    <Input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={label}
                      required
                      className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-md p-2 text-gray-800 dark:text-gray-200 focus:ring-2"
                    />
                  </div>
                ))}

                {/* Submit button */}
                <Button type="submit" className="w-full font-medium py-2 px-4 rounded-md shadow">
                  Create Campground
                </Button>
              </form>
            ) : (
              <p className="text-red-500 font-semibold text-center">You are not authorized to create campgrounds.</p>
            )}
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
