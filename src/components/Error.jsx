export default function Error({ title, message, className }) {
  return (
    <div className={className ? className : 'error'}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}