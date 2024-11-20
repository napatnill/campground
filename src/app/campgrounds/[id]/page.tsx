import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppLayout from "@/components/layout/app-layout";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getCampground from "@/lib/campground/getCampground";
import getUserProfile from "@/lib/user/getUserProfile";
import { getServerSession } from "next-auth";
import { dbConnect } from "@/db/dbConnect";
import Campground from "@/db/models/Campground";
import { redirect } from "next/navigation";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function CampgroundDetailPage({ params }: { params: { id: string } }) {
  // Fetch campground details
  const campground = await getCampground(params.id);

  // Check session for logged-in users
  const session = await getServerSession(authOptions);
  const profile = session && session.user.token ? await getUserProfile(session.user.token) : null;

  // Server action to update the campground
  const updateCampground = async (updateForm: FormData) => {
    "use server";

    // Extract updated values from the form
    const name = updateForm.get("name");
    const address = updateForm.get("address");
    const district = updateForm.get("district");
    const province = updateForm.get("province");
    const postalcode = updateForm.get("postalcode");
    const tel = updateForm.get("tel");
    const picture = updateForm.get("picture");

    // Connect to the database and update the campground
    try {
      await dbConnect();
      await Campground.findByIdAndUpdate(params.id, {
        name,
        address,
        district,
        province,
        postalcode,
        tel,
        picture,
      });


      // Revalidate the landing page path and the current detail page path
      revalidatePath("/");
      revalidatePath(`/campgrounds/${params.id}`);
    } catch (error) {
      console.error("Error updating campground:", error);
    }

    // Redirect to landing page
    redirect("/");

  };

  // Server action to delete the campground
  const deleteCampground = async () => {
    "use server";

    try {
      await dbConnect();
      await Campground.findByIdAndDelete(params.id);

      // Revalidate paths
      revalidatePath("/");
    } catch (error) {
      console.error("Error deleting campground:", error);
    }

    // Redirect to the landing page
    redirect("/");
  };

  return (
    <AppLayout>
      <div className="w-full flex flex-col flex-1 overflow-hidden bg-background">
        <Navbar title="Campground Details" />
        <main className="flex-1 overflow-auto p-6">
          {/* Campground Details */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
            {/* Title Section */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {campground.data.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Explore the beauty of {campground.data.name} located in{" "}
                {campground.data.district}.
              </p>
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-64">
                <Image
                  src={campground.data.picture}
                  alt="Campground Picture"
                  fill={true}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Info Section */}
              <div className="flex-1 text-lg text-gray-700 dark:text-gray-300 space-y-3">
                <div className="bg-zinc-100 dark:bg-zinc-700 rounded-lg p-4">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {campground.data.name}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {campground.data.address}
                  </p>
                  <p>
                    <span className="font-semibold">District:</span>{" "}
                    {campground.data.district}
                  </p>
                  <p>
                    <span className="font-semibold">Province:</span>{" "}
                    {campground.data.province}
                  </p>
                  <p>
                    <span className="font-semibold">Postal Code:</span>{" "}
                    {campground.data.postalcode}
                  </p>
                  <p>
                    <span className="font-semibold">Tel:</span>{" "}
                    {campground.data.tel}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href={`/book/${params.id}`}>
                <Button>
                    Book this Campground
                </Button>
              </Link>
            </div>

            {/* Delete Button for Admin */}
            {profile && profile.data.role === "admin" && (
            <div className="mt-8 text-center">
              <form action={deleteCampground}>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow"
                >
                    Delete Campground
                </Button>
              </form>
            </div>
            )}


          </div>

          {/* Admin Form */}
          {profile && profile.data.role === "admin" ? (
            <div className="max-w-4xl mx-auto mt-20 bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
              <form action={updateCampground} className="space-y-6">
                <h2 className="text-2xl font-semibold text-center">
                  Update Campground
                </h2>

                {/* Form fields pre-filled with existing data */}
                {[
                  { id: "name", label: "Name", value: campground.data.name },
                  { id: "address", label: "Address", value: campground.data.address },
                  { id: "district", label: "District", value: campground.data.district },
                  { id: "province", label: "Province", value: campground.data.province },
                  { id: "postalcode", label: "Postal Code", value: campground.data.postalcode },
                  { id: "tel", label: "Tel", value: campground.data.tel },
                  { id: "picture", label: "Picture URL", value: campground.data.picture },
                ].map(({ id, label, value }) => (
                  <div key={id} className="flex flex-col">
                    <label
                      htmlFor={id}
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {label}
                    </label>
                    <Input
                      id={id}
                      name={id}
                      type="text"
                      defaultValue={value}
                      required
                      className="mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-md p-2 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>
                ))}

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full font-medium py-2 px-4 rounded-md shadow"
                >
                  Update Campground
                </Button>
              </form>
            </div>
          ) : null}
        </main>
      </div>
    </AppLayout>
  );
}
