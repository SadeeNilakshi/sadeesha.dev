export default function StackIconMarquee() {
  const icons = [
    "/vscode.png",
    "/Android_Studio.png",
    "/intelij.png",
    "/netbeans.png",
    "/mysql.png",
    "/firebase.png",
    "/git.png",
  ];

  // duplicate for seamless loop
  const repeatedIcons = [...icons, ...icons, ...icons];

  return (
    <div className="frame-section">
      <div className="frame-content">
        {repeatedIcons.map((icon, index) => (
          <div className="frame-box" key={index}>
            <div className="frame-glow"></div>

            <div className="frame-inner">
              <div className="frame-layer">
                <div className="frame-circle-outer"></div>
                <div className="frame-circle-inner"></div>
                <img src={icon} alt="stack icon" className="frame-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
