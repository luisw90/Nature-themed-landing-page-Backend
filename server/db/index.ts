import db from './db';

const getTheme = async (themeid) => {
  const getcart = await db.getThemeDb(themeid);
  return getcart;
};

const getItems = async (userid) => {
  const getitems = await db.getItemsDb(userid);
  return getitems;
};

const saveItem = async (item, userid: string) => {
  const additem = await db.saveItemDb(item, userid);
  return additem;
};

const deleteItem = async (userid: string, itemid: string) => {
  const deleteitem = await db.deleteItemDb(userid, itemid);
  return deleteitem;
};

export {
  getTheme, saveItem, deleteItem, getItems,
};
