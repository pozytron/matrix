import "./styles.css";
import DecisionMatrix from "./DecisionMatrix";
// check if client has default or custom matrix
const order = {
  fba_order: "FBA42D04Q69A",
  internal_routing: {
    contract_number: "1002"
  },
  packages: [
    {
      fba_number: "FBA42D04Q69A000001",
      weight: 20,
      size_l: 110,
      size_w: 30,
      size_d: 30,
      content: "furnitures, ",
      value: 20
    },
    {
      fba_number: "FBA42D04Q69A000001",
      weight: 12.01,
      size_l: 40,
      size_w: 30,
      size_d: 20,
      content: "furnitures, ",
      value: 20
    },
    {
      fba_number: "FBA42D04Q88DU000001",
      weight: 12.01,
      size_l: 40,
      size_w: 30,
      size_d: 20,
      content: "furnitures, ",
      value: 20
    },
    {
      fba_number: "FBA42D04Q88DU000001",
      weight: 12.01,
      size_l: 40,
      size_w: 30,
      size_d: 20,
      content: "furnitures, ",
      value: 20
    }
  ],
  receiver: {
    name: "Yanush Kovalsky",
    company: "Kovalsky&Company",
    city: "Błotowo",
    address_line_1: "ul Zachlapana 5",
    zip_code: "55-123",
    country: "DE",
    tel: "0048133456789",
    email: "yan@nu.sh"
  },
  sender: {
    name: "Bogena Codu",
    company: "K&C",
    city: "Dziurawce",
    address_line_1: "ul Wyrwana 7",
    zip_code: "66-693",
    country: "DE",
    tel: "0048133456789",
    email: "bog@ge.na"
  }
};

console.log(
  `parsing order for clinet: ${order.internal_routing.contract_number}`
);

// create object accordingly:

const default_countries = [
  {
    country_code: "DE",
    std: {
      size_l: {
        min: 0,
        max: 120
      },
      size_w: {
        min: 0,
        max: 60
      },
      size_d: {
        min: 0,
        max: 60
      }
    },
    nst: {
      size_l: {
        min: 120,
        max: 200
      },
      size_w: {
        min: 120,
        max: 200
      },
      size_d: {
        min: 120,
        max: 200
      }
    }
  },
  {
    country_code: "FR",
    std: {
      size_l: {
        min: 0,
        max: 100
      },
      size_w: {
        min: 0,
        max: 45
      },
      size_d: {
        min: 0,
        max: 45
      }
    },
    nst: {
      size_l: {
        min: 100,
        max: 180
      },
      size_w: {
        min: 45,
        max: 100
      },
      size_d: {
        min: 45,
        max: 100
      }
    }
  }
];

const default_weights = [
  {
    from: 0,
    to: 5,
    vendor_code: "GLS_DE"
  },
  {
    from: 5,
    to: 10,
    vendor_code: "GLS_DE"
  },
  {
    from: 10,
    to: 30,
    vendor_code: "GLS_DE"
  },
  {
    from: 30,
    to: 50,
    vendor_code: "UPS_PL"
  }
];

const default_nst_vendor_code = "GLS_DE";
const default_multi_from = 3;

const matrix = new DecisionMatrix(
  default_countries,
  default_weights,
  default_nst_vendor_code,
  default_multi_from
);

console.log(matrix.decide(order));
console.log(matrix.getLogs());
