import { useSortable } from "@dnd-kit/sortable";
import { FC, JSX } from "react";
type PropsType = {
  id: string;
  children: JSX.Element;
};
import { CSS } from "@dnd-kit/utilities";
const Item: FC<PropsType> = (props) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({
      id: props.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {props.children}
    </div>
  );
};

export default Item;
