import { Outlet } from "react-router-dom";

function FeedLayout() {
  return (
    <div>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default FeedLayout;
