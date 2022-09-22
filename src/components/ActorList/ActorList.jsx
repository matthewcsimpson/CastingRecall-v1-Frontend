function ActorList({ actors }) {
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="actors">
      <div className="actors__wrapper">
        <div className="actors__cards">
          {actors.map((a) => {
            return (
              <div key={a.id} className="actors__card">
                <img
                  className="actors__cardimage"
                  src={`${IMG_BASE}${a.profile_path}`}
                  alt={a.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ActorList;
