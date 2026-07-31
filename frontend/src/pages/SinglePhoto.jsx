import { Bookmark, Check, ChevronDown, Download, Plus } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";

const SinglePhoto = () => {
  const { photoId } = useParams();
  return (
    <div className="w-full px-10">
      <div className="w-full h-15 bg-white flex items-center justify-between">
        <Link to={`/profile/id`} className="flex items-center gap-3">
          <img
            src="https://scontent.cdninstagram.com/v/t51.82787-19/753933135_18058628423769659_775130425570823510_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=101&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=JIx-UIJh2x0Q7kNvwGj0zZ4&_nc_oc=AdpDswfTltllKPyHyac5hzNrMZrct1V4qv1qgUhlIxl0G0UGZL3F6J7QrSg1Z5YIXrE&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=pXDrorSbE9DWjGCZHW8EJQ&_nc_ss=7a689&oh=00_AQDBAe5WMkOvYrctF3tBmFS3Z73rg4ULxELHJL76WVud8g&oe=6A700AA0"
            alt="profile-photo"
            className="w-10 rounded-full"
          />
          <div>
            <h2 className="capitalize font-semibold">kaif soomro</h2>
            <p className="text-blue-500 text-xs flex items-center gap-1">
              Available for hire
              <span className="w-3 h-3 rounded-full flex items-center justify-center bg-blue-500 text-white">
                <Check size={10} />
              </span>
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <button
            title="Bookmarks"
            className="text-neutral-500/80 hover:text-neutral-800 border hover:border-neutral-800 rounded-lg p-2 transition-all ease duration-200 cursor-pointer shadow"
          >
            <Bookmark size={23} />
          </button>

          <button
            title="Add to Collection"
            className="text-neutral-500/80 hover:text-neutral-800 border hover:border-neutral-800 rounded-lg p-2 transition-all ease duration-200 cursor-pointer shadow"
          >
            <Plus size={23} />
          </button>

          <div className="flex items-center gap-0.5">
            <button className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer px-3 py-2 rounded-l-lg font-semibold shadow">
              Download free
            </button>

            <div className="relative group">
              <button className="flex items-center gap-2 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 px-4 py-2.5 text-sm font-medium transition">
                <ChevronDown
                  size={20}
                />
              </button>

              <div className="absolute right-0 top-12 z-50 w-64 origin-top-right overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl opacity-0 scale-95 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:scale-100">

                <button className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      Small
                    </p>
                    <span className="text-xs text-neutral-500">640 × 426</span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>

                <button className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      Medium
                    </p>
                    <span className="text-xs text-neutral-500">1080 × 720</span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>

                <button className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      Large
                    </p>
                    <span className="text-xs text-neutral-500">
                      1920 × 1280
                    </span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>

                <button className="flex w-full items-center justify-between border-t border-neutral-300 px-4 py-3 transition hover:bg-neutral-100">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-neutral-900">
                      Original Size
                    </p>
                    <span className="text-xs text-neutral-500">
                      6000 × 4000
                    </span>
                  </div>
                  <Download size={16} className="text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePhoto;
