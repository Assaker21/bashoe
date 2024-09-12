import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../components/page-header/page-header.component";
import Datatable from "../../../components/datatable/datatable.component";
import { useEffect, useMemo, useState } from "react";
import contentsApi from "../../../api/contents.api";
import ContentDialog from "../dialogs/content.dialog";
import { ArrowRight } from "lucide-react";
import useQuery from "../../../hooks/useQuery";

export default function AllContents() {
  const params = useParams();
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();

  const [loading, setLoading] = useState({ fetch: true });
  const [contents, setContents] = useState();
  const [selected, setSelected] = useState({ id: Number(query.get("item")) });
  const [visible, setVisible] = useState(Boolean(query.get("item")));
  const [mode, setMode] = useState("edit");

  const findManyContents = async () => {
    setLoading({ ...loading, fetch: true });
    const { ok, data } = await contentsApi.findMany();

    if (ok) {
      setContents(data);
    }

    setLoading({ ...loading, fetch: false });
  };

  useEffect(() => {
    findManyContents();
  }, []);

  const contentRows = useMemo(() => {
    return (
      contents?.map((content) => {
        return {
          id: content.id,
          header: content.header,
          description: content.description,
          type: content.type,
          location: content.location,
          dataSelection: content.dataSelection,
          sequenceNumber: content.sequenceNumber,
          data: content.data,
        };
      }) || []
    );
  }, [contents]);

  const updateContents = async (newContents) => {
    const updated = [];

    newContents.map((content, index) => {
      if (content.sequenceNumber != index) {
        content.sequenceNumber = index;
        updated.push({ ...content });
      }
      return content;
    });

    if (updated.length > 0) {
      setLoading({ ...loading, update: true });
      const promises = updated.map((value) =>
        contentsApi.updateSingle(
          { id: value.id },
          { sequenceNumber: value.sequenceNumber }
        )
      );

      await Promise.all(promises);

      setLoading({ ...loading, update: false });

      await findManyContents();
    }
  };

  const removeContents = async (toBeDeleted) => {
    setLoading({ ...loading, remove: true });

    const promises = toBeDeleted.map((element) =>
      contentsApi.deleteSingle({ id: element.id })
    );

    await Promise.all(promises);

    setLoading({ ...loading, remove: false });

    await findManyContents();
  };

  return (
    <section>
      <ContentDialog
        visible={visible}
        setVisible={setVisible}
        loading={loading.fetch}
        value={selected}
        content={selected}
        setContents={setContents}
        onClose={() => {
          navigate(location.pathname);
        }}
        mode={mode}
      />
      <PageHeader title={"Content"} />
      <Datatable
        buttons={{
          create: {
            onClick: () => {
              setVisible(true);
              setMode("create");
            },
          },
          remove: { onClick: removeContents },
        }}
        loading={loading.fetch || loading.update || loading.remove}
        name="Content"
        data={contentRows}
        setData={updateContents}
        reorderableRows={true}
        selectable={true}
        onRowClick={(e) => {
          const row = e.data;
          setSelected(row);
          setVisible(true);
          setMode("edit");
          navigate(location.pathname + `?item=${selected.id}`);
        }}
        columns={[
          {
            field: "id",
            header: "Id",
            sortable: true,
            style: { width: "100px" },
          },
          { field: "header", header: "Header" },
          {
            field: "description",
            header: "Description",
          },
          { field: "type", header: "Type" },
          { field: "location", header: "Location" },
          { field: "dataSelection", header: "Data selection" },
        ]}
      />
    </section>
  );
}
