import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../components/page-header/page-header.component";
import Datatable from "../../../components/datatable/datatable.component";
import { useEffect, useMemo, useState } from "react";
import variantsApi from "../../../api/variants.api";
import { ArrowRight } from "lucide-react";
import useQuery from "../../../hooks/useQuery";
import Avatar from "../../../components/avatar/avatar.component";
import VariantDialog from "../dialogs/variant.dialog";

export default function AllVariants() {
  const params = useParams();
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();

  const [loading, setLoading] = useState({ fetch: true });
  const [variants, setVariants] = useState();
  const [selected, setSelected] = useState({ id: Number(query.get("item")) });
  const [visible, setVisible] = useState(Boolean(query.get("item")));
  const [mode, setMode] = useState("edit");
  const [variantGroup, setVariantGroup] = useState();

  const findManyVariants = async (id) => {
    setLoading({ ...loading, fetch: true });
    const { ok, data } = await variantsApi.findManySingle({
      id: id || Number(params.id),
    });

    if (ok) {
      setVariants(data.itemVariants);
      setVariantGroup(data);
    }

    if (query.get("item")) {
      setSelected(
        data.itemVariants.find(
          (element) => element.id == Number(query.get("item"))
        )
      );
    }

    setLoading({ ...loading, fetch: false });
  };

  useEffect(() => {
    findManyVariants();
  }, [params.id]);

  const variantRows = useMemo(() => {
    return (
      variants?.map((variant) => {
        return {
          id: variant.id,
          description: variant.description,
          url: variant.url,
        };
      }) || []
    );
  }, [variants]);

  const updateVariants = async (newVariants) => {
    const updated = [];

    newVariants.map((variant, index) => {
      if (variant.sequenceNumber != index) {
        variant.sequenceNumber = index;
        updated.push({ ...variant });
      }
      return variant;
    });

    if (updated.length > 0) {
      setLoading({ ...loading, update: true });
      const promises = updated.map((value) =>
        variantsApi.updateSingle(
          { id: value.id },
          { sequenceNumber: value.sequenceNumber }
        )
      );

      await Promise.all(promises);

      setLoading({ ...loading, update: false });

      await findManyVariants();
    }
  };

  const removeVariants = async (toBeDeleted) => {
    setLoading({ ...loading, remove: true });

    const promises = toBeDeleted.map((element) =>
      variantsApi.deleteSingle({ id: element.id })
    );

    await Promise.all(promises);

    setLoading({ ...loading, remove: false });

    await findManyVariants();
  };

  return (
    <section>
      <VariantDialog
        visible={visible}
        setVisible={setVisible}
        loading={loading.fetch}
        value={selected}
        variant={selected}
        setVariants={setVariants}
        onClose={() => {
          navigate(location.pathname);
        }}
        mode={mode}
        refresh={async () => {
          const { ok, data } = await variantsApi.findManySingle({
            id: Number(params.id),
          });

          if (ok) {
            setVariants(data.itemVariants);
            setVariantGroup(data);
          }
        }}
      />
      <PageHeader
        title={variantGroup?.description || "..."}
        hasBack={Boolean(params.id)}
        onClickBack={() => {
          let newPath = location.pathname.split("/");

          newPath.pop();
          newPath = newPath
            .reduce((acc, curr) => acc + "/" + curr, "")
            .replace("//", "/");
          navigate(newPath);
        }}
      />
      <Datatable
        buttons={{
          create: {
            onClick: () => {
              setVisible(true);
              setMode("create");
            },
          },
          remove: { onClick: removeVariants },
        }}
        loading={loading.fetch || loading.update || loading.remove}
        name="Variant"
        data={variantRows}
        setData={updateVariants}
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
          {
            field: "description",
            header: "Description",
            sortable: true,
          },
        ]}
      />
    </section>
  );
}
