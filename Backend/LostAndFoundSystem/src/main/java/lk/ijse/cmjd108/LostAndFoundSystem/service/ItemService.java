package lk.ijse.cmjd108.LostAndFoundSystem.service;

import lk.ijse.cmjd108.LostAndFoundSystem.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    void addItem(ItemDTO itemDTO, String userId);

    void updateItemDetails(String itemId, ItemDTO itemDTO);

    List<ItemDTO> getAllItems();

    ItemDTO getItemById(String itemId);

    void deleteItem(String itemId);
}
