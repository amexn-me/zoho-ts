import type { AddressWithoutAddressId } from "./address";
import type { Document } from "./document";
import type { LineItem } from "./lineItem";
import type { PackageShortList } from "./package";
import type { Invoice } from "./invoice";
import type { CustomField } from "./customField";

export type UpdateSalesOrder = Omit<
    CreateSalesOrder,
    "documents" | "template_id"
> &
    Pick<SalesOrder, "salesorder_id">;

export type PaymentOverview = {
    payment_id: string;
    payment_mode: string;
    payment_mode_id: string;
    amount: number;
    date: string;
    offline_created_date_with_time: string;
    description: string;
    reference_number: string;
    account_id: string;
    account_name: string;
    payment_type: string;
};

export type CreateSalesOrder =
    /**
     * Required fields
     */
    Pick<SalesOrder, "salesorder_number" | "customer_id"> &
        /**
         * Optional fields
         */
        Partial<
            Pick<
                SalesOrder,
                | "adjustment_description"
                | "adjustment"
                | "contact_persons"
                | "date"
                | "delivery_method"
                | "discount_type"
                | "discount"
                | "documents"
                | "exchange_rate"
                | "gst_no"
                | "gst_treatment"
                | "is_discount_before_tax"
                | "notes"
                | "place_of_supply"
                | "pricebook_id"
                | "reference_number"
                | "salesorder_id"
                | "salesperson_name"
                | "shipment_date"
                | "shipping_charge_tax_id"
                | "shipping_charge"
                | "template_id"
                | "terms"
            >
        > & /**
         * Additional fields
         */ {
            line_items: (Pick<LineItem, "item_id" | "quantity"> &
                Partial<LineItem>)[];
            /**
             * Unique ID generated for the customer. This is used as an identifier.
             */
            customer_id: string;

            custom_fields?: CustomField[];

            /**
             * Used to specify whether the line item rates are inclusive or exclusive of
             * tax.
             */
            is_inclusive_tax?: boolean;

            /**
             * Exchange rate of the currency, with respect to the base currency.
             */
            exchange_rate?: number;

            /**
             * Unique Id generated by the server for address in contacts page. To add a
             * billing address to sales order, send the address_id using this node.
             * Else, the default billing address for that contact is used
             */
            billing_address_id?: string;

            /**
             * Unique Id generated by the server for address in contacts page. To add a
             * shipping address to sales order, send the address_id using this node. Else,
             * the default shipping address for that contact is used
             */
            shipping_address_id?: string;
        };

/**
 * Custom fields that always start with "cf_"
 */
type CustomFieldsDirectAPIResponse = { [key: string]: unknown };

/**
 * A sales order is a financial document that confirms an impending sale. It
 * details the exact quantity, price and delivery details of the products or
 * services being sold. Perform the simple operations mentioned below to create
 * and manage your Sales Orders
 */
export type SalesOrder = {
    /**
     * Unique ID generated by the server for the Sales Order. This is used as identifier.
     */
    salesorder_id: string;

    payments: PaymentOverview[];

    /**
     * Ignore auto sales order number generation for this sales order. This mandates the sales order number
     */
    ignore_auto_number_generation?: boolean;

    /**
     * The Sales Order number. This is unique for each sales order.
     */
    salesorder_number: string;

    /**
     * The date for the Sales Order.
     * ISO 8601 format - YYYY-MM-DDThh:mm:ssTZD
     */
    date: string;

    /**
     * The current status of the Sales Order.
     */
    status: string;

    /**
     * Shipment date of the Sales Order.
     * ISO 8601 format - YYYY-MM-DDThh:mm:ssTZD
     */
    shipment_date: string;

    /**
     * Reference number of the Sales Order
     */
    reference_number: string;

    /**
     * Unique ID generated for the customer. This is used as an identifier.
     */
    customer_id: string;

    /**
     * Name of the customer.
     */
    customer_name: string;

    /**
     * Company name (billing address) if set in contact
     */
    company_name: string;

    /**
     * The contact persons IDs, that are connected to this salesorder
     */
    contact_persons: string[];

    /**
     * Unique ID generated by the server for the currency. This is used as an identifier.
     */
    currency_id: string;

    /**
     * Currency code.
     */
    currency_code: string;

    /**
     * The symbol for the selected currency.
     */
    currency_symbol: string;

    /**
     * Exchange rate of the currency, with respect to the base currency.
     */
    exchange_rate: number;

    /**
     * Discount to be applied on the Sales Order.
     */
    discount_amount: number;

    /**
     * The percentage of Discount applied. Is a number for discount
     * in € and string for discount in percentage ("15%")
     */
    discount: string | number;

    /**
     * Used to check whether the discount is applied before tax or after tax.
     */
    is_discount_before_tax: boolean;

    /**
     * Type of discount. Allowed values are entity_level,item_level. For
     * entity_level type, discount is applied at entity level and the node
     * discount resides outside the line_items node.For item_level type,
     * discount is applied at item level and the node discount resides inside
     * each line_item under the line_items node
     */
    discount_type: "entity_level" | "item_level";

    /**
     * Unique ID generated by the server from the Estimate created in Zoho Books. This is used as an identifier.
     */
    estimate_id?: string;

    /**
     * Delivery method of the shipment.
     */
    delivery_method?: string;

    /**
     * Unique ID generated by the server for the delivery method. This is used as an identifier.
     */
    delivery_method_id?: string;

    /**
     * A sales order can contain multiple line items
     */
    line_items: LineItem[];

    /**
     * Shipping charges that can be applied to the Sales Order.
     */
    shipping_charge: number;

    /**
     * Adjustment on the Sales Order's total.
     */
    adjustment: number;

    /**
     * Description for the adjustment.
     */
    adjustment_description: string;

    /**
     * Sub total of the Sales Order.
     */
    sub_total: number;

    /**
     * Tax total of the Sales Order.
     */
    tax_total: number;

    /**
     * Total amount of the Sales Order.
     */
    total: number;

    /**
     * Number of taxes applied on sales order.
     */
    taxes: {
        tax_amount: number;
        tax_name: string;
    }[];

    /**
     * The precision level for the price's decimal point in a Sales Order.
     */
    price_precision: number;

    /**
     * Unique ID generated by the server for the Pricebook. This is used as an identifier.
     */
    pricebook_id?: number;

    /**
     * Checks whether the Sales Order has been emailed to the customer or not.
     */
    is_emailed: boolean;

    /**
     * The shipping charges in one object
     */
    shipping_charges?: {
        description: string;
        bcy_rate: number;
        /**
         * the gross rate shipping charges
         */
        rate: number;
        tax_id: string;
        tax_name: string;
        tax_type: string;
        tax_percentage: 7;
        tax_total_fcy: number;
        /**
         * the net total shipping costs
         */
        item_total: number;
    };

    /**
     * These are the packages created for Sales Orders
     * The quantity is the total amount of items in this package
     * TODO: fix this type, dont use the whole package type
     */
    packages: (PackageShortList & { quantity: number })[];

    /**
     * Invoices created for the Sales Order.
     */
    invoices: Pick<
        Invoice,
        | "invoice_id"
        | "invoice_number"
        | "reference_number"
        | "status"
        | "date"
        | "due_date"
        | "total"
        | "balance"
    >[];

    /**
     * Customer's shipping address.
     */
    shipping_address: AddressWithoutAddressId;

    /**
     * The internal Id. Sometimes, Zoho is not returning this value
     */
    billing_address_id?: string;

    /**
     * The internal Id. Sometimes, Zoho is not returning this value
     */
    shipping_address_id?: string;

    /**
     * Customer's billing address.
     */
    billing_address: AddressWithoutAddressId;

    /**
     * Notes for the Sales Order.
     */
    notes: string;

    /**
     * Terms for the Sales Order.
     */
    terms: string;

    /**
     * Unique ID generated by the server for the Template. This is used as an identifier.
     */
    template_id: string;

    /**
     * Name of the template used for the Sales Order.
     */
    template_name: string;

    /**
     * Type of the template.
     */
    template_type: string;

    /**
     * Time at which the Sales Order was created.
     */
    created_time: string;

    /**
     * Time at which the sales order details were last modified.
     */
    last_modified_time: string;

    /**
     * Name of attached file with Sales Order.
     */
    attachment_name: string;

    /**
     * Checks whether the sales order can be sent as a mail or not.
     */
    can_send_in_mail: boolean;

    /**
     * Unique ID generated by the server for the sales person. This is used as an identifier.
     */
    salesperson_id: string;

    /**
     * Name of the Sales Person.
     */
    salesperson_name: string;

    /**
     * Sales order can have files attached to them.
     */
    documents: Document[];

    /**
     * Applicable for transactions that fall before july 1, 2017
     *
     * India Edition only
     */
    is_pre_gst?: boolean;

    /**
     * 15 digit GST identification number of the customer.
     *
     * India Edition only
     */
    gst_no?: string;

    /**
     * Choose whether the contact is GST registered/unregistered/consumer/overseas.
     *
     * India Edition only
     */
    gst_treatment?: "business_gst" | "business_none" | "overseas" | "consumer";

    /**
     * Place where the goods/services are supplied to. (If not given, `place of
     * contact` given for the contact will be taken)
     *
     * India Edition only
     */
    place_of_supply?: string;

    /**
     * Id of the shipping tax
     *
     * Not documented
     */
    shipping_charge_tax_id: string;

    /**
     * Shipping charge tax rate in percent.
     *
     * Not officially documented. Returns empty string when not set
     */
    shipping_charge_tax_percentage: number | "";

    /**
     *  Additional custom fields
     */
    [key: string]: unknown;

    custom_fields: CustomField[];
};

export type ListSalesOrder = Pick<
    SalesOrder,
    | "salesorder_id"
    | "customer_name"
    | "customer_id"
    | "delivery_date"
    | "company_name"
    | "salesorder_number"
    | "reference_number"
    | "date"
    | "shipment_date"
    | "due_by_days"
    | "due_in_days"
    | "currency_code"
    | "total"
    | "total_invoiced_amount"
    | "created_time"
    | "last_modified_time"
    | "is_emailed"
    | "quantity"
    | "order_status"
    | "invoiced_status"
    | "paid_status"
    | "shipped_status"
    | "status"
    | "is_drop_shipment"
    | "salesperson_name"
    | "has_attachment"
> &
    CustomFieldsDirectAPIResponse & {
        /**
         * The email address of the main contact person related to this salesorder
         */
        email: string;
    };
