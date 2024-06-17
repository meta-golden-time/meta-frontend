import './content.css';

const Content = ({ title, description, image }) => {
  return (
    <div>
      <h1 className="subtitle">{title}</h1>
       {/* props 값이 들어오면 내용이 보이고 들어오지 않으면 보이지 않음 */}
      {description && <p className="content">{description}</p>}
      {image && <img className="contentImg" src={image} alt={title} />}
    </div>
  );
}

export default Content;
