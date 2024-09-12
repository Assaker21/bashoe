import "./content.dialog.scss";
import FormDialog from "../../../components/dialogs/form-dialog.component";
import { useEffect, useState } from "react";
import contentsApi from "../../../api/contents.api";
import Input from "../../../components/input/input.component";
import { useParams } from "react-router-dom";
import DropDown from "../../../components/dropdown/dropdown.component";
import ItemsDropDown from "../../../components/dropdowns/items-dropdown/items.dropdown";
import { Card } from "primereact/card";
import ImageInput from "../../../components/image-input/image-input.component";

export default function ContentDialog({
  content,
  setContents,
  mode,
  visible,
  ...rest
}) {
  const [localContent, setLocalContent] = useState({ data: [] });
  const [updatedContent, setUpdatedContent] = useState({});
  const [loading, setLoading] = useState({ save: false });
  const params = useParams();

  useEffect(() => {
    setLocalContent(content);
    setUpdatedContent({});
  }, [content]);

  useEffect(() => {
    if (visible) {
      if (mode == "edit") {
        console.log("CONTENT: ", content);
        setLocalContent(content);
      } else {
        setLocalContent({ description: "", header: "", data: [] });
      }

      setUpdatedContent({});
    }
  }, [visible, mode]);

  const onSave = async () => {
    setLoading({ ...loading, save: true });

    if (mode == "edit") {
      const { ok } = await contentsApi.updateSingle(
        { id: content.id },
        updatedContent
      );

      if (ok) {
        console.log("Started fetch...");
        const { ok, data } = await contentsApi.findMany();

        console.log("Finished fetch: ", data);

        if (ok) {
          setContents(data);
          setUpdatedContent({});
        }
      }
    } else {
      if (!updatedContent.data) updatedContent.data = [];
      const { ok } = await contentsApi.createSingle(updatedContent);

      if (ok) {
        const { ok, data } = await contentsApi.findMany();

        console.log("Finished fetch: ", data);

        if (ok) {
          setContents(data);
          setUpdatedContent({});
        }
      }
    }

    setLoading({ ...loading, save: false });
    rest.setVisible(false);
    rest.onClose && rest.onClose();
  };

  return (
    <FormDialog
      {...rest}
      visible={visible}
      header={mode == "create" ? "Create content" : `Content #${content?.id}`}
      saveEnabled={JSON.stringify(updatedContent)?.trim() != "{}"}
      onSave={onSave}
      saveLoading={Boolean(loading?.save)}
    >
      <Input
        label={"Description"}
        value={localContent?.description || ""}
        onChange={(e) => {
          setLocalContent((curr) => ({
            ...curr,
            description: e.target.value,
          }));

          setUpdatedContent((curr) => ({
            ...curr,
            description: e.target.value,
          }));
        }}
        placeholder="Description"
      />

      <Input
        label={"Header"}
        value={localContent?.header || ""}
        onChange={(e) => {
          setLocalContent((curr) => ({ ...curr, header: e.target.value }));

          setUpdatedContent((curr) => ({ ...curr, header: e.target.value }));
        }}
        placeholder="Header"
      />

      <DropDown
        values={["Home", "Single Item Page", "Checkout"]}
        value={localContent?.location}
        setValue={(newValue) => {
          setLocalContent((curr) => {
            return { ...curr, location: newValue };
          });

          setUpdatedContent((curr) => {
            return { ...curr, location: newValue };
          });
        }}
        placeholder={"Location"}
        label={"Location"}
      />

      <DropDown
        values={["Manual"]}
        value={localContent?.dataSelection}
        setValue={(newValue) => {
          setLocalContent((curr) => {
            return { ...curr, dataSelection: newValue };
          });

          setUpdatedContent((curr) => {
            return { ...curr, dataSelection: newValue };
          });
        }}
        placeholder={"Data selection"}
        label={"Data selection"}
      />
      <br />

      <DropDown
        values={["List of items", "Banner"]}
        value={localContent?.type}
        setValue={(newValue) => {
          setLocalContent((curr) => {
            return { ...curr, type: newValue };
          });

          setUpdatedContent((curr) => {
            return { ...curr, type: newValue };
          });
        }}
        placeholder={"Type"}
        label={"Type"}
      />

      {localContent.type === "List of items" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: ".5rem",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((v) => {
            return (
              <ItemCard
                onChange={(e) => {
                  const data = [
                    localContent?.data[0],
                    localContent?.data[1],
                    localContent?.data[2],
                    localContent?.data[3],
                    localContent?.data[4],
                    localContent?.data[5],
                  ];
                  data[v - 1] = e.value;

                  console.log("NEW DATA:", data);
                  setLocalContent((curr) => {
                    return { ...curr, data };
                  });

                  setUpdatedContent((curr) => {
                    return { ...curr, data };
                  });
                }}
                item={localContent?.data[v - 1] || ""}
              />
            );
          })}
        </div>
      )}

      {localContent.type === "Banner" && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: ".5rem",
            marginTop: ".5rem",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((v) => {
            return (
              <ImageInput
                value={localContent?.data[v - 1] || ""}
                onChange={(e) => {
                  const data = [
                    localContent?.data[0],
                    localContent?.data[1],
                    localContent?.data[2],
                    localContent?.data[3],
                    localContent?.data[4],
                    localContent?.data[5],
                  ];
                  data[v - 1] = e.target.value;
                  setLocalContent((curr) => {
                    return { ...curr, data };
                  });

                  setUpdatedContent((curr) => {
                    return { ...curr, data };
                  });
                }}
              />
            );
          })}
        </div>
      )}
    </FormDialog>
  );
}

function ItemCard({ item, onChange }) {
  return (
    <Card style={{ flex: 1, minWidth: "300px" }}>
      <ItemsDropDown initialValue={item} onChange={onChange} />
      <span>{item?.name}</span>
    </Card>
  );
}
