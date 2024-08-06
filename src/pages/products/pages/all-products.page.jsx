import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../../components/page-header/page-header.component";
import Datatable from "../../../components/datatable/datatable.component";
import { useEffect, useMemo, useState } from "react";
import productsApi from "../../../api/products.api";
import { ArrowRight } from "lucide-react";
import useQuery from "../../../hooks/useQuery";
import { Avatar } from "primereact/avatar";

export default function AllProducts() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState({ fetch: true });
  const [products, setProducts] = useState(null);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("edit");

  const findManyProducts = async () => {
    setLoading({ ...loading, fetch: true });
    const { ok, data } = await productsApi.findMany();

    if (ok) {
      setProducts(data);
    }

    setLoading({ ...loading, fetch: false });
  };

  useEffect(() => {
    findManyProducts();
  }, []);

  const productRows = useMemo(() => {
    return (
      products?.map((product) => {
        return {
          id: product.id,
          sku: product.sku,
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          categories: product.categories,
          itemVariants: product.itemVariants,
        };
      }) || []
    );
  }, [products]);

  const removeProducts = async (toBeDeleted) => {
    setLoading({ ...loading, remove: true });

    const promises = toBeDeleted.map((element) =>
      productsApi.deleteSingle({ id: element.id })
    );

    await Promise.all(promises);

    setLoading({ ...loading, remove: false });

    await findManyProducts();
  };

  return (
    <section>
      <PageHeader title="Products" />
      <Datatable
        buttons={{
          create: {
            onClick: () => {
              navigate("/products/new");
            },
          },
          remove: { onClick: removeProducts },
        }}
        loading={loading.fetch || loading.update || loading.remove}
        name="Products"
        data={productRows}
        setData={() => {}}
        reorderableRows={false}
        selectable={true}
        onRowClick={(e) => {
          const row = e.data;
          setSelected(row);
          setVisible(true);
          setMode("edit");
          navigate(location.pathname + `/${row.sku}`);
        }}
        scrollable
        scrollHeight="calc(100vh - 124px)"
        columns={[
          {
            field: "id",
            header: "Id",
            sortable: true,
          },
          {
            field: "image",
            header: "Image",
            body: (row) => (
              <img
                style={{
                  width: "60px",
                  height: "50px",
                  objectFit: "contain",
                  borderRadius: "0.5rem",
                }}
                alt=""
                src={row.images[0]?.url.replace("<number>", "01")}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.lighting.philips.com.au/content/dam/b2b-philips-lighting/ecat-fallback.png?wid=93&hei=93&qlt=82";
                }}
              />
            ),
          },
          {
            field: "sku",
            header: "Sku",
            sortable: true,
          },
          {
            field: "name",
            header: "Name",
            sortable: true,
          },
          {
            field: "description",
            header: "Description",
            sortable: true,
            style: {
              maxWidth: "300px",
              textWrap: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
          {
            field: "categories",
            header: "Categories",
            body: (row) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  maxWidth: "200px",
                }}
              >
                {row.categories.map((category) => (
                  <div key={category.id} className="chip info">
                    {category.description}
                  </div>
                ))}
              </div>
            ),
          },
          {
            field: "price",
            header: "Price",
            sortable: true,
            body: (row) => "$" + Number(row.price).toFixed(2),
          },
        ]}
      />
    </section>
  );
}
