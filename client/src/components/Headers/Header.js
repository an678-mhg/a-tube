import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarUser from "./NavbarUser";
import NavLogin from "./NavLogin";
import { useSearchParams } from "../../hooks/useSearchParms";

const Header = ({ setShowMenu }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const timeoutRef = useRef();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [text, setText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const onChangeForm = (e) => {
    const value = e.target.value;
    setText(value);

    if (!value.trim()) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      navigate(
        `/search?type=${searchParams.get("type") || "video"}&q=${value}`
      );
    }, 300);
  };

  useEffect(() => {
    window.addEventListener("click", () => setShowSearch(false));
    return () => {
      window.removeEventListener("click", () => setShowSearch(false));
    };
  }, []);

  return (
    <div className="flex justify-between items-center text-white py-2 relative px-4 lg:bg-transparent bg-[#333]">
      <div className="flex items-center justify-center">
        <i
          onClick={() => setShowMenu(true)}
          className="bx bx-menu-alt-left text-[25px] lg:hidden cursor-pointer"
        ></i>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          navigate(
            `/search?type=${searchParams.get("type") || "video"}&q=${text}`
          );
          setShowSearch(false);
        }}
        onClick={(e) => e.stopPropagation()}
        className={`items-center rounded-full overflow-hidden justify-center w-[500px] ${
          showSearch ? "top-[50px] shadow-md" : "top-[-100px]"
        } fixed max-w-full left-0 flex md:static transition-all z-[9999]`}
      >
        <input
          value={text}
          className="text-white bg-[#222] flex-1 outline-none py-1 pl-4 h-[30px]"
          type="text"
          placeholder="Tìm kiếm"
          onChange={(e) => onChangeForm(e)}
        />
        <button className="px-3 bg-red-500 w-[45px] h-[30px] flex items-center">
          <i className="text-xl bx bx-search"></i>
        </button>
      </form>

      <div className="flex items-center">
        <div
          className="flex items-center justify-center mr-4 md:hidden cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowSearch(!showSearch);
          }}
        >
          <i
            className={`text-xl ${
              showSearch ? "bx bx-x" : "bx bx-search"
            } text-[25px]`}
          ></i>
        </div>
        {currentUser ? <NavbarUser user={currentUser} /> : <NavLogin />}
      </div>
    </div>
  );
};

export default Header;
