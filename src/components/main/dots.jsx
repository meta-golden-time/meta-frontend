// 점 컴포넌트 정의
const Dot = ({ num, currentPage, handleDotClick }) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        border: "1px solid #3498db",
        borderRadius: 999,
        backgroundColor: currentPage === num ? "#3498db" : "transparent",
        transitionDuration: 1000,
        transition: "background-color 0.5s",
        cursor: "pointer",
      }}
      onClick={() => handleDotClick(num)}
    ></div>
  );
};

// 점들을 포함하는 Dots 컴포넌트 정의
const Dots = ({ currentPage, handleDotClick }) => {
  return (
    <div style={{ position: "fixed", top: "50%", right: 45 }}> {/* right -> 오른쪽으로 이동 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: 20,
          height: 100,
        }}
      >
        <Dot num={1} currentPage={currentPage} handleDotClick={handleDotClick} />
        <Dot num={2} currentPage={currentPage} handleDotClick={handleDotClick} />
        <Dot num={3} currentPage={currentPage} handleDotClick={handleDotClick} />
        <Dot num={4} currentPage={currentPage} handleDotClick={handleDotClick} />
        <Dot num={5} currentPage={currentPage} handleDotClick={handleDotClick} />
        <Dot num={6} currentPage={currentPage} handleDotClick={handleDotClick} />
      </div>
    </div>
  );
};

export default Dots;
