import { Link } from "react-router-dom";
import { SubpageShell } from "../components/SubpageShell";

export function NotFound() {
  return (
    <SubpageShell intro={<h1 id="page-title">페이지를 찾을 수 없습니다</h1>}>
      <div className="container prose">
        <p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p>
        <p>
          <Link to="/">홈으로 이동</Link>
        </p>
      </div>
    </SubpageShell>
  );
}
