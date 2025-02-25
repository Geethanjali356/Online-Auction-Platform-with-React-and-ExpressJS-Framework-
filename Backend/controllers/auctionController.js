exports.editAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    if (auction.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this auction' });
    }

    const { itemName, description, startingBid, closingTime } = req.body;
    auction.itemName = itemName || auction.itemName;
    auction.description = description || auction.description;
    auction.startingBid = startingBid || auction.startingBid;
    auction.closingTime = closingTime || auction.closingTime;

    await auction.save();
    res.json({ message: 'Auction updated successfully', auction });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
