package tn.esprit.pidev.bns.entity.khalil;

public enum ClaimSubject {
    None("None"),
    Purchases_and_payments("Purchases and payments"),
    Gift_Cards_and_Promotions("Gift Cards and Promotions"),
    Delivery_and_Tracking("Delivery and Tracking"),
    My_Orders_and_Returns("My Orders and Returns"),
    Stock_of_products_and_well_being("Stock of products and well-being"),
    Other("Other");

    private final String displayName;

    ClaimSubject(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
