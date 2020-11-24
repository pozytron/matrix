export default class Matrix {
  constructor(countries, weights, nst_vendor_code, multi_from) {
    this.countries = countries;
    this.weights = [...weights];
    this.nst_vendor_code = nst_vendor_code;
    this.multi_from = multi_from;
    this.log = [`Initiated ${new Date().toLocaleTimeString()}`];
  }
  getCountryMatrix(order) {
    this.log.push("Searching for country");
    let countryMatrices = false;
    this.countries.forEach((country) => {
      if (country.country_code === order.receiver.country) {
        countryMatrices = country;
      }
    });
    return countryMatrices;
  }
  isSizeStandard(order, cM) {
    this.log.push("Calculating if parcel has standard sizes");
    // take dimentions of first package (evey package should be the same size in an order)
    const size_l = order.packages[0].size_l;
    const size_w = order.packages[0].size_w;
    const size_d = order.packages[0].size_d;
    // select biggest dimmention
    this.log.push("Selecting biggest dimmention");
    const maxSize = Math.max(size_l, size_w, size_d);
    const maxSTDLimit = Math.max(
      cM.std.size_l.max,
      cM.std.size_w.max,
      cM.std.size_d.max
    );

    if (maxSize <= maxSTDLimit) {
      // console.log("Parcel is standard  ", maxSize, maxSTDLimit);
      this.log.push(".. Parcel is standard with max size: " + maxSize);
      return true;
    } else {
      this.log.push(
        `.. Parcel ${maxSize} is not standard  where max is ${maxSTDLimit}`
      );
      // return false;
      if (size_l > cM.nst.size_l.min && size_l < cM.nst.size_l.max) {
        this.log.push(".. L is not starndard" + size_l);
        return false;
      } else if (size_l > cM.std.size_l.min && size_l < cM.std.size_l.max) {
        this.log.push(".. L is standard" + size_l);
        return true;
      } else {
        this.log.push(".. Błąd rozmiaru L przesyłki" + size_l);
      }

      if (size_w > cM.nst.size_w.min && size_w < cM.nst.size_w.max) {
        this.log.push(".. W is not starndard" + size_w);
        return false;
      } else if (size_w > cM.std.size_w.min && size_w < cM.std.size_w.max) {
        this.log.push(".. W is standard" + size_w);
        return true;
      } else {
        this.log.push(".. Błąd rozmiaru W przesyłki" + size_w);
      }

      if (size_d > cM.nst.size_d.min && size_d < cM.nst.size_d.max) {
        this.log.push(".. H is not starndard" + size_d);
        return false;
      } else if (size_d > cM.std.size_d.min && size_d < cM.std.size_d.max) {
        // if std
        this.log.push(".. H is standard" + size_d);
        return true;
      } else {
        this.log.push(".. Błąd rozmiaru H przesyłki" + size_d);
      }
    }
  }
  getVendorByWeight(order) {
    this.log.push("Determinig which wendor by weight...");
    // take weight of first package (evey package should be the same weight in an order)
    const parcel_weight = order.packages[0].weight;
    let selectedVendor = null;
    this.weights.forEach((weight) => {
      if (parcel_weight > weight.from && parcel_weight <= weight.to) {
        selectedVendor = weight.vendor_code;
      }
    });

    return selectedVendor;
  }
  decide(order) {
    let selectedVendor = null;
    // check for country
    this.log.push("Parcel for: " + order.receiver.country);
    const countryMatrix = this.getCountryMatrix(order);
    // check if size is standard for that country or not
    const isStandard = this.isSizeStandard(order, countryMatrix);
    this.log.push("Parcel is standard size: " + isStandard);
    if (!isStandard) {
      selectedVendor = this.nst_vendor_code;
    } else {
      selectedVendor = this.getVendorByWeight(order);
      // select vendor per weight
    }
    // multipackage??
    this.log.push(`Vendor decided: ${selectedVendor}`);
    return selectedVendor;
  }
  getLogs() {
    return this.log;
  }
}
