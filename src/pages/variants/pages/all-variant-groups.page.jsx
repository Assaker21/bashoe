import "./all-variant-groups.page.scss";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../components/page-header/page-header.component";
import Datatable from "../../../components/datatable/datatable.component";
import { useEffect, useMemo, useState } from "react";
import variantsApi from "../../../api/variants.api";
import { ArrowRight } from "lucide-react";
import useQuery from "../../../hooks/useQuery";
import VariantGroupDialog from "../dialogs/variant-group.dialog";

export default function AllVariantGroups() {
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();

  const [loading, setLoading] = useState({ fetch: true });
  const [variantGroups, setVariantGroups] = useState();
  const [selected, setSelected] = useState({ id: Number(query.get("item")) });
  const [visible, setVisible] = useState(Boolean(query.get("item")));
  const [mode, setMode] = useState("edit");

  const findManyVariantGroups = async () => {
    setLoading({ ...loading, fetch: true });
    const { ok, data } = await variantsApi.findManyGroup();

    if (ok) {
      setVariantGroups(data);
    }

    if (query.get("item")) {
      setSelected(
        data.find((element) => element.id == Number(query.get("item")))
      );
    }

    setLoading({ ...loading, fetch: false });
  };

  useEffect(() => {
    findManyVariantGroups();
  }, []);

  const variantGroupRows = useMemo(() => {
    return (
      variantGroups?.map((variantGroup) => {
        return {
          id: variantGroup.id,
          description: variantGroup.description,
        };
      }) || []
    );
  }, [variantGroups]);

  const removeVariantGroups = async (toBeDeleted) => {
    setLoading({ ...loading, remove: true });

    const promises = toBeDeleted.map((element) =>
      variantsApi.deleteGroup({ id: element.id })
    );

    await Promise.all(promises);

    setLoading({ ...loading, remove: false });

    await findManyVariantGroups();
  };

  return (
    <section>
      <VariantGroupDialog
        visible={visible}
        setVisible={setVisible}
        loading={loading.fetch}
        value={selected}
        variantGroup={selected}
        setVariantGroups={setVariantGroups}
        onClose={() => {
          navigate(location.pathname);
        }}
        refresh={async () => {
          const { ok, data } = await variantsApi.findManyGroup();

          if (ok) {
            setVariantGroups(data);
          }
        }}
        mode={mode}
      />
      <PageHeader title={"Variant groups"} />
      <Datatable
        buttons={{
          create: {
            onClick: () => {
              setVisible(true);
              setMode("create");
            },
          },
          remove: { onClick: removeVariantGroups },
        }}
        loading={loading.fetch || loading.update || loading.remove}
        name="Variant groups"
        data={variantGroupRows}
        setData={() => {}}
        reorderableRows={false}
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
          {
            field: "description",
            header: "Description",
            sortable: true,
          },
          {
            field: "enter",
            header: "",
            body: (row) => (
              <button
                className="icon text"
                onClick={() => {
                  navigate(location.pathname + "/" + row.id);
                }}
              >
                Variants
                <ArrowRight size={20} className="icon-item" />
              </button>
            ),
            style: { width: "100px" },
          },
        ]}
      />
    </section>
  );
}
