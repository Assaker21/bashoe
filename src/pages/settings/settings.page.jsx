import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs.component";
import DenseTable from "../../components/table/table.component";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import {
  TextField,
  IconButton,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

import itemsServices from "../../services/itemsServices";
import categoriesServices from "../../services/categoriesServices.js";

import "./settings.page.scss";

//categories, variants, shipping fees
export default function Settings() {
  const [categories, setCategories] = useState([]);

  const [itemVariantGroups, setItemVariantGroups] = useState([]);

  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    handleGetCategories();
    handleGetItemVariantGroups();
  }, []);

  useEffect(() => {
    console.log("groups: ", itemVariantGroups);
  }, [itemVariantGroups]);

  async function handleGetCategories() {
    const [ok, data] = await categoriesServices.getCategories();
    if (ok) {
      setCategories(data);
    } else {
      console.log("error: ", data);
    }
  }

  async function handleGetItemVariantGroups() {
    const [ok, data] = await itemsServices.getItemVariants();
    if (ok) {
      setItemVariantGroups(data);
      console.log("groups: ", data);
    } else {
      console.log("error: ", data);
    }
  }

  async function handleSaveCategory(index) {
    const category = categories[index];
    console.log("Category: ", category);
    const [ok, data] = await categoriesServices.upsertCategory(category);
    if (ok) {
      setCategories(data);
      return true;
    } else {
      console.log("error: ", data);
    }
  }

  async function handleDeleteCategory(index) {
    const category = categories[index];
    if (!category.id || category.id == "") return;

    const [ok, data] = await categoriesServices.removeCategory(category);
    if (ok) {
      setCategories(data);
      return true;
    } else {
      console.log("error: ", data);
    }
  }

  async function handleSaveItemVariantGroup(index) {
    const itemVariantGroup = itemVariantGroups[index];

    console.log("Item variant group: ", itemVariantGroup);
    const [ok, data] = await itemsServices.upsertItemVariantGroup(
      itemVariantGroup
    );
    if (ok) {
      console.log("data: ", data);
      setItemVariantGroups(
        updateItemVariantGroupsWithChangingCollapse(itemVariantGroups, data)
      );
      return true;
    } else {
      console.log("error: ", data);
    }
  }

  async function handleDeleteItemVariantGroup(index) {
    const itemVariantGroup = itemVariantGroups[index];
    if (!itemVariantGroup.id || itemVariantGroup.id == "") return;

    const [ok, data] = await itemsServices.deleteItemVariantGroup(
      itemVariantGroup
    );
    if (ok) {
      setItemVariantGroups(
        updateItemVariantGroupsWithChangingCollapse(itemVariantGroups, data)
      );
      return true;
    } else {
      console.log("error: ", data);
    }
  }

  async function handleSaveItemVariant(
    itemVariantGroupIndex,
    itemVariantIndex
  ) {
    const itemVariant =
      itemVariantGroups[itemVariantGroupIndex].itemVariants[itemVariantIndex];

    const [ok, data] = await itemsServices.upsertItemVariant({
      ...itemVariant,
      itemVariantGroupId: itemVariantGroups[itemVariantGroupIndex].id,
    });
    if (ok) {
      console.log(
        "Data: ",
        updateItemVariantGroupsWithChangingCollapse(itemVariantGroups, data)
      );
      setItemVariantGroups(
        updateItemVariantGroupsWithChangingCollapse(itemVariantGroups, data)
      );
      return true;
    } else {
      console.log("error: ", data);
    }
  }

  async function handleDeleteItemVariant(id) {
    /*const itemVariant =
      itemVariantGroups[itemVariantGroupIndex].itemVariants[itemVariantIndex];
    console.log("Item variant: ", itemVariant);
    if (!itemVariant.id || itemVariant.id == "") return;*/
    if (!id || id == "") return;

    const [ok, data] = await itemsServices.deleteItemVariant({ id });
    if (ok) {
      setItemVariantGroups(
        updateItemVariantGroupsWithChangingCollapse(itemVariantGroups, data)
      );
      return true;
    } else {
      console.log("error: ", data);
    }
  }

  function updateItemVariantGroupsWithChangingCollapse(oldValue, newValue) {
    return newValue.map((v, index) => {
      if (!oldValue || !oldValue[index]?.collapsed) return v;
      return {
        ...v,
        collapsed: oldValue[index].collapsed,
      };
    });
  }

  async function handleSaveShippingFee() {}

  return (
    <section className="settings">
      <Breadcrumbs
        items={[
          { name: "Home", to: "/" },
          {
            name: "Settings",
            to: "/settings",
          },
        ]}
      />
      <h1>Settings</h1>
      <h3>Shipping</h3>
      <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        <TextField
          type="number"
          size="small"
          sx={{ width: "100%" }}
          label="Shipping fee"
          value={shippingFee}
          onChange={(e) => {
            setShippingFee(e.target.value);
          }}
        />
        <IconButton
          onClick={() => {
            handleSaveShippingFee();
          }}
        >
          <SaveIcon />
        </IconButton>
      </div>

      <h3>Categories</h3>
      <DenseTable
        columns={[
          { description: "Id", align: "left", accessor: "id" },
          {
            width: "50%",
            description: "Description",
            align: "left",
            accessor: "description",
          },
          {
            width: "50%",
            description: "Sku",
            align: "left",
            accessor: "sku",
          },
          {
            accessor: "action",
            align: "right",
            description: (
              <IconButton
                size="small"
                onClick={() => {
                  setCategories([
                    ...categories,
                    { id: "", description: "", editing: true },
                  ]);
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            ),
          },
        ]}
        rows={categories.map(
          ({ id, description, sku, editing, saving }, index) => {
            return {
              id,
              description: editing ? (
                <TextField
                  variant="standard"
                  size="small"
                  sx={{ width: "100%" }}
                  value={description}
                  onChange={(e) => {
                    const newCategories = [...categories];
                    newCategories[index].description = e.target.value;
                    setCategories(newCategories);
                  }}
                />
              ) : (
                description
              ),
              sku: editing ? (
                <TextField
                  variant="standard"
                  size="small"
                  sx={{ width: "100%" }}
                  value={sku}
                  onChange={(e) => {
                    const newCategories = [...categories];
                    newCategories[index].sku = e.target.value;
                    setCategories(newCategories);
                  }}
                />
              ) : (
                sku
              ),
              action: (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  {saving && (
                    <CircularProgress size={16} thickness={6} sx={{ p: 1 }} />
                  )}
                  {!saving && (
                    <IconButton
                      size="small"
                      onClick={async () => {
                        const newCategories = [...categories];
                        newCategories[index].editing =
                          !categories[index].editing;
                        if (!categories[index].editing) {
                          newCategories[index].saving = true;
                          setCategories(newCategories);
                          const ok = await handleSaveCategory(index);
                          if (ok) {
                            console.log("Category saved!");
                            /*const _newCategories = [...categories];
                            _newCategories[index].saving = false;
                            setCategories(_newCategories);*/
                          }
                        } else setCategories(newCategories);
                      }}
                    >
                      {editing ? (
                        <SaveIcon fontSize="small" />
                      ) : (
                        <EditIcon fontSize="small" />
                      )}
                    </IconButton>
                  )}
                  {!saving && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        setCategories(categories.filter((_, i) => i !== index));
                        handleDeleteCategory(index);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ),
            };
          }
        )}
      />
      <h3>Variants</h3>
      <DenseTable
        columns={[
          {
            width: "40px",
            description: "",
            align: "left",
            accessor: "collapsible",
          },
          { width: "40px", description: "Id", align: "left", accessor: "id" },
          {
            width: "100%",
            description: "Description",
            align: "left",
            accessor: "description",
          },
          {
            accessor: "action",
            align: "right",
            description: (
              <IconButton
                size="small"
                onClick={() => {
                  setItemVariantGroups([
                    ...itemVariantGroups,
                    {
                      id: "",
                      description: "",
                      itemVariants: [],
                      editing: true,
                    },
                  ]);
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            ),
          },
        ]}
        rows={itemVariantGroups.map(
          (
            { id, description, itemVariants, editing, saving, collapsed },
            index
          ) => {
            return {
              collapsible: (
                <IconButton
                  size="small"
                  onClick={() => {
                    const newItemVariantGroups = [...itemVariantGroups];
                    newItemVariantGroups[index].collapsed =
                      !itemVariantGroups[index].collapsed;
                    setItemVariantGroups(newItemVariantGroups);
                  }}
                >
                  <ArrowDropDownIcon fontSize="small" />
                </IconButton>
              ),
              collapsibleContent: (
                <DenseTable
                  variant={"none"}
                  columns={[
                    {
                      width: "40px",
                      description: "Id",
                      align: "left",
                      accessor: "id",
                    },
                    {
                      width: "50%",
                      description: "Description",
                      align: "left",
                      accessor: "description",
                    },
                    {
                      width: "50%",
                      description: "Image",
                      align: "left",
                      accessor: "image",
                    },
                    {
                      accessor: "action",
                      align: "right",
                      description: (
                        <IconButton
                          size="small"
                          onClick={() => {
                            const newItemVariantGroups = [...itemVariantGroups];
                            newItemVariantGroups[index].itemVariants = [
                              ...newItemVariantGroups[index].itemVariants,
                              {
                                id: "",
                                description: "",
                                editing: true,
                              },
                            ];
                            setItemVariantGroups(newItemVariantGroups);
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      ),
                    },
                  ]}
                  rows={itemVariants.map((itemVariant, itemVariantIndex) => {
                    return {
                      id: itemVariant.id,
                      description: itemVariant.editing ? (
                        <TextField
                          variant="standard"
                          size="small"
                          sx={{ width: "100%" }}
                          value={itemVariant.description}
                          onChange={(e) => {
                            const newItemVariantGroups = [...itemVariantGroups];
                            newItemVariantGroups[index].itemVariants[
                              itemVariantIndex
                            ].description = e.target.value;
                            setItemVariantGroups(newItemVariantGroups);
                          }}
                        />
                      ) : (
                        itemVariant.description
                      ),
                      image: itemVariant.editing ? (
                        <TextField
                          variant="standard"
                          size="small"
                          sx={{ width: "100%" }}
                          value={itemVariant.url}
                          onChange={(e) => {
                            const newItemVariantGroups = [...itemVariantGroups];
                            newItemVariantGroups[index].itemVariants[
                              itemVariantIndex
                            ].url = e.target.value;
                            setItemVariantGroups(newItemVariantGroups);
                          }}
                        />
                      ) : (
                        itemVariant.url
                      ),
                      action: (
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "end",
                          }}
                        >
                          {itemVariant.saving && (
                            <CircularProgress
                              size={16}
                              thickness={6}
                              sx={{ p: 1 }}
                            />
                          )}
                          {!itemVariant.saving && (
                            <IconButton
                              size="small"
                              onClick={async () => {
                                const newItemVariantGroups = [
                                  ...itemVariantGroups,
                                ];
                                newItemVariantGroups[index].itemVariants[
                                  itemVariantIndex
                                ].editing =
                                  !itemVariantGroups[index].itemVariants[
                                    itemVariantIndex
                                  ].editing;
                                if (
                                  !itemVariantGroups[index].itemVariants[
                                    itemVariantIndex
                                  ].editing
                                ) {
                                  newItemVariantGroups[index].itemVariants[
                                    itemVariantIndex
                                  ].saving = true;
                                  const ok = await handleSaveItemVariant(
                                    index,
                                    itemVariantIndex
                                  );
                                  if (ok) {
                                    /*const newv = [...itemVariantGroups];
                                    newv[index].itemVariants[
                                      itemVariantIndex
                                    ].saving = false;
                                    setItemVariantGroups(newv);*/
                                  }
                                } else
                                  setItemVariantGroups(newItemVariantGroups);
                              }}
                            >
                              {itemVariant.editing ? (
                                <SaveIcon fontSize="small" />
                              ) : (
                                <EditIcon fontSize="small" />
                              )}
                            </IconButton>
                          )}
                          {!itemVariant.saving && (
                            <IconButton
                              size="small"
                              onClick={() => {
                                const newItemVariantGroups = [
                                  ...itemVariantGroups,
                                ];

                                handleDeleteItemVariant(
                                  newItemVariantGroups[index].itemVariants[
                                    itemVariantIndex
                                  ].id
                                );

                                newItemVariantGroups[index].itemVariants =
                                  newItemVariantGroups[
                                    index
                                  ].itemVariants.filter(
                                    (_, i) => i !== itemVariantIndex
                                  );

                                setItemVariantGroups(newItemVariantGroups);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      ),
                    };
                  })}
                />
              ),
              collapsed: collapsed,
              id,
              description: editing ? (
                <TextField
                  variant="standard"
                  size="small"
                  sx={{ width: "100%" }}
                  value={description}
                  onChange={(e) => {
                    const newItemVariantGroups = [...itemVariantGroups];
                    newItemVariantGroups[index].description = e.target.value;
                    setItemVariantGroups(newItemVariantGroups);
                  }}
                />
              ) : (
                description
              ),
              action: (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  {saving && (
                    <CircularProgress size={16} thickness={6} sx={{ p: 1 }} />
                  )}
                  {!saving && (
                    <IconButton
                      size="small"
                      onClick={async () => {
                        const newItemVariantGroups = [...itemVariantGroups];
                        newItemVariantGroups[index].editing =
                          !itemVariantGroups[index].editing;
                        if (!itemVariantGroups[index].editing) {
                          newItemVariantGroups[index].saving = true;
                          const ok = handleSaveItemVariantGroup(index);

                          if (ok) {
                            /*const newv = [...newItemVariantGroups];
                            newv[index].saving = false;
                            setItemVariantGroups(newv);*/
                          }
                        } else setItemVariantGroups(newItemVariantGroups);
                      }}
                    >
                      {editing ? (
                        <SaveIcon fontSize="small" />
                      ) : (
                        <EditIcon fontSize="small" />
                      )}
                    </IconButton>
                  )}
                  {!saving && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        setItemVariantGroups(
                          itemVariantGroups.filter((_, i) => i !== index)
                        );
                        handleDeleteItemVariantGroup(index);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ),
            };
          }
        )}
      />
    </section>
  );
}
