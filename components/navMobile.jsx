import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavMobile = () => {
  return (
    <nav>
      <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        <MenuIcon
          style={{ fontSize: "30px", background: "white" }}
          className="iconClose"
        />
      </button>

      {isDrawerOpen && (
        <div className="fixed top-0 right-0 w-auto max-w-full h-full z-30 bg-white shadow-lg">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 bg-white"
          >
            <CloseIcon
              style={{
                fontSize: "30px",
                background: "white",
              }}
              className="iconClose"
            />
          </button>
          <NavText/>
        </div>
      )}
    </nav>
  );
};

export default NavMobile;
