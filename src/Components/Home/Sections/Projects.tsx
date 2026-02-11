const Projects = () => {
  return (
    <section
      id="projects"
      className="bg-Bluey h-screen relative overflow-hidden pt-15"
    >
      <video
        src="/Video/blackhole.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover optimize-gpu absolute bottom-[-307px] select-none "
      ></video>
      <div className="z-1000 flex flex-col justify-center items-center bg-transparent">
        <h2>Resent Projects</h2>
        <p>there will Be projects SOON</p>
      </div>
    </section>
  );
};

export default Projects;
