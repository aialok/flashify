import { Hourglass } from "react-loader-spinner";

function Loader() {
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <Hourglass
        visible={true}
        width="200"
        color="#2563EB"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default Loader;
