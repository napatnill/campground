export default async function getCampgrounds() {
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds`, {
        cache: "no-store", // Disable caching for real-time data
        next: { tags: ["campgrounds"] },
      });
    
    if(!response.ok){
        throw new Error("Failed to fetch all campgrounds");
    }

    return await response.json();
}