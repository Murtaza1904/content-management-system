export default function Breadcrumb() {
  return (
    <>
      <div className="container-fluid px-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb my-0">
            <li className="breadcrumb-item"><a href="#">Home</a>
            </li>
            <li className="breadcrumb-item active"><span>Dashboard</span>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}