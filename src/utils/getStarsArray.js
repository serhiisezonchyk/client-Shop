import { Image } from "react-bootstrap";

function getStarsArray(product) {
  const raiting = [];
  for (let i = 0; i < product.raiting; i++) {
    raiting[i] = (
      <Image
        width={18}
        height={18}
        key={"raitStar" + product.id + "i" + i}
        src={"https://cdn-icons-png.flaticon.com/128/1828/1828884.png"}
      />
    );
  }
  for (let i = product.raiting; i < 5; i++) {
    raiting[i] = (
      <Image
        width={18}
        height={18}
        key={"raitStar" + product.id + "i" + i}
        src={"https://cdn-icons-png.flaticon.com/128/1828/1828970.png"}
      />
    );
  }
  return raiting;
}
export default getStarsArray;
