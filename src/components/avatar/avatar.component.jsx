export default function Avatar({ url, alt, ...rest }) {
  return <img src={url} alt={alt || ""} {...rest} />;
}
