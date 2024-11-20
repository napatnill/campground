export default async function getCampground(id: string) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${id}`);

    if(!response.ok){
        throw new Error("Failed to fetch a single campground");
    }

    return await response.json();
}