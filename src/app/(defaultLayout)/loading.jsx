export default function Loading() {
  return (
    <div className="cs_perloader">
      <div className="cs_perloader_content">
        <div className="cs_perloader_in">
          <div className="cs_wave_first">
            <svg viewBox="0 0 150 73" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <polyline
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
              />
            </svg>
          </div>
          <div className="cs_wave_second">
            <svg viewBox="0 0 150 73" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <polyline
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="300"
                points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
