



function FeaturedPosts({ posts }) {
  return (
    <div
      // style={{ border: "3px solid green" }}
      className="bg-white rounded-[0.6rem] border border-gray-300 p-4 "
    >
      <span className="text-2xl font-bold text-gray-800">Featured</span>
      <div className="flex overflow-x-scroll">
        {posts?.map((post) => (
          <div key={post?._id}>
            {post.featured && (
              <div
                // style={{ border: "3px solid red" }}
                className=" border border-gray-300 h-[8rem] m-3 flex flex-col gap-6 p-2 rounded-lg cursor-pointer"
              >
                <div className="">
                  <span className="text-sm font-semibold text-gray-400">
                    Post
                  </span>
                </div>
                <div className="">
                  <span className="">{post?.caption}</span>
                </div>
                {/* <div className="">
                  <span className="">{post?.likes?.length}</span>
                  <span className="">{post?.comments?.length}</span>
                </div> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedPosts