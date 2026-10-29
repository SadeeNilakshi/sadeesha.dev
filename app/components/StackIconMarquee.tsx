export default function StackIconMarquee() {
  const icons = [
    { src: "/vscode.png", name: "VS Code" },
    { src: "/Android_Studio.png", name: "Android Studio" },
    { src: "/intelij.png", name: "IntelliJ IDEA" },
    { src: "/netbeans.png", name: "NetBeans" },
    { src: "/mysql.png", name: "MySQL" },
    { src: "/firebase.png", name: "Firebase" },
    { src: "/git.png", name: "Git" },
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
                <img src={icon.src} alt={icon.name} className="frame-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
