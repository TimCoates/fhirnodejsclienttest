var express = require('express');
var router = express.Router();
const axios = require('axios');
//const {v4 : uuidv4} = require('uuid')

/*
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
*/

require('dotenv').config()

// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

axios.defaults.baseURL = process.env.HOSTNAME;
axios.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;
axios.defaults.headers.common['x-api-key'] = process.env.XAPIKEY;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* UPDATE (put) vacc page. */
router.post('/', function(req, res, next) {

  console.log("Inside updatevacc.js")
  console.log(req.body);

 var id               = req.body.id;
 var POCidentifier    = req.body.pocidentifier;
 var nhsNumber        = req.body.nhsnumber;
 var vaccineProcedure = req.body.vaccprocedure;
 var date             = req.body.date + "T00:00:00.000+00:00";
 var expirationDate   = req.body.expirydate;
 var lotNumber        = req.body.batchnumber;

/* vaccination procedures */

if (vaccineProcedure == "polioboostercampaign")
 { 
  vaccineProcedureCode = "170356000";
  vaccineProcedureDescription = "Administration of booster dose of vaccine product containing only Human poliovirus antigen";
}
if (vaccineProcedure == "covdose1")
 { 
  vaccineProcedureCode = "1324681000000101";
  vaccineProcedureDescription = "Administration of first dose of SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) vaccine";
}
if (vaccineProcedure == "covdose2")
 { 
  vaccineProcedureCode = "1324691000000104";
  vaccineProcedureDescription = "Administration of second dose of SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2) vaccine";
}
if (vaccineProcedure == "covbooster")
 { 
  vaccineProcedureCode = "1362591000000103";
  vaccineProcedureDescription = "Immunisation course to maintain protection against SARS-CoV-2 (severe acute respiratory syndrome coronavirus 2)";
}
if (vaccineProcedure == "hpvdose")
 { 
  vaccineProcedureCode = "734152003";
  vaccineProcedureDescription = "Administration of vaccine product containing only Human papillomavirus 6, 11, 16 and 18 antigens";
}

/* vaccine types (products) */

 var vaccineProduct = req.body.vaccine;

 if (vaccineProduct == "infanrixhexa")
 { 
  vaccineProductCode = "34765811000001105";
  vaccineProductDescription = "Infanrix Hexa vaccine powder and suspension for suspension for injection 0.5ml pre-filled syringes (GlaxoSmithKline UK Ltd)";
}
 if (vaccineProduct == "vaxelis")
 { 
  vaccineProductCode = "39367111000001105";
  vaccineProductDescription = "Vaxelis vaccine suspension for injection 0.5ml pre-filled syringes (Sanofi)";
}
 if (vaccineProduct == "boostrixipv")
 { 
  vaccineProductCode = "26267211000001100";
  vaccineProductDescription = "Boostrix-IPV suspension for injection 0.5ml pre-filled syringes (GlaxoSmithKline UK Ltd)";
}
 if (vaccineProduct == "revaxis")
 { 
  vaccineProductCode = "7374311000001101";
  vaccineProductDescription = "Revaxis vaccine suspension for injection 0.5ml pre-filled syringes (Sanofi Pasteur)";
}
 if (vaccineProduct == "vaxzevria")
 { 
  vaccineProductCode = "39114911000001105";
  vaccineProductDescription = "COVID-19 Vaccine Vaxzevria (ChAdOx1 S [recombinant]) not less than 2.5x100,000,000 infectious units/0.5ml dose suspension for injection multidose vials (AstraZeneca UK Ltd) ";
}
 if (vaccineProduct == "comirnaty30")
 { 
  vaccineProductCode = "39115611000001103";
  vaccineProductDescription = "COVID-19 mRNA Vaccine Pfizer-BioNTech BNT162b2 30micrograms/0.3ml dose concentrate for suspension for injection multidose vials (Pfizer Ltd)";
}
 if (vaccineProduct == "comirnaty10")
 { 
  vaccineProductCode = "40384611000001108";
  vaccineProductDescription = "Comirnaty Children 5-11 years COVID-19 mRNA Vaccine 10micrograms/0.2ml dose concentrate for dispersion for injection multidose vials (Pfizer Ltd)";
}
 if (vaccineProduct == "comirnaty0O")
 { 
  vaccineProductCode = "40851611000001102";
  vaccineProductDescription = "Comirnaty Original/Omicron BA.1 COVID-19 mRNA Vaccine 15micrograms/15micrograms/0.3ml dose dispersion for injection multidose vials (Pfizer Ltd)";
}
 if (vaccineProduct == "spikevax")
 { 
  vaccineProductCode = "39326911000001101";
  vaccineProductDescription = "Spikevax COVID-19 mRNA (nucleoside modified) Vaccine 0.1mg/0.5ml dose dispersion for injection multidose vials (Moderna, Inc)";
}
 if (vaccineProduct == "modernabspikevax0O")
 { 
  vaccineProductCode = "40801911000001102";
  vaccineProductDescription = "COVID-19 Vaccine Spikevax 0 (Zero)/O (Omicron) 0.1mg/ml dispersion for injection multidose vials (Moderna, Inc)";
}
 if (vaccineProduct == "gardasil")
 { 
  vaccineProductCode = "10880211000001104";
  vaccineProductDescription = "Gardasil vaccine suspension for injection 0.5ml pre-filled syringes (Merck Sharp & Dohme (UK) Ltd)";
}

//var uuid = uuidv4();

 console.log("id " + id);
 console.log("vaccineProductCode " + vaccineProductCode);
 console.log("vaccineProductDescription " + vaccineProductDescription);
 console.log("POCidentifier " + POCidentifier);
 //console.log("identifier UUID " + uuid);



axios.put('/Immunization/' + id, 
{
  "resourceType": "Immunization",
  "id": id,
  "meta": {
       "profile":  [
          "https://fhir.nhs.uk/StructureDefinition/NHSDigital-Immunization"
        ]
   },
  "extension": [ {
        "url": "https://fhir.hl7.org.uk/StructureDefinition/Extension-UKCore-VaccinationProcedure",
        "valueCodeableConcept": {
          "coding": [ {
            "system": "http://snomed.info/sct",
            "code": vaccineProcedureCode,
            "display": vaccineProcedureDescription
          } ]
        }
      } ],
  "identifier": [
    {
      "system": "https://supplierABC/identifiers/vacc",
      "value": POCidentifier
    }
  ],
  "status": "completed",
  "vaccineCode": {
  "coding": [
   {
     "system": "http://snomed.info/sct",
     "code": vaccineProductCode,
     "display": vaccineProductDescription
   }
   ]
  },
  "patient": {
    /* "reference": "Patient/" + process.env.PATIENT, */
    "reference": "https://sandbox.api.service.nhs.uk/personal-demographics/Patient/" + nhsNumber,
    "type": "Patient",
    "identifier": {
      "system": "https://fhir.nhs.uk/Id/nhs-number",
      "value": nhsNumber
      }
  },
  "occurrenceDateTime": date,
  "primarySource": true,
  "lotNumber": lotNumber,
  "expirationDate": expirationDate,
  "site": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "368208006",
        "display": "Left upper arm structure (body structure)"
      }
    ]
  },
  "route": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "78421000",
        "display": "Intramuscular route (qualifier value)"
      }
    ]
  },
  "doseQuantity": {
    "value": 0.5,
    "unit": "Millilitre",
    "system": "http://snomed.info/sct",
    "code": "258773002"
  },
  "performer": [
    {
      "function": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0443",
            "code": "OP"
          }
        ]
      },
      "actor": {
        "reference": "Practitioner/example"
      }
    },
    {
      "function": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0443",
            "code": "AP"
          }
        ]
      },
      "actor": {
        "reference": "Practitioner/example"
      }
    }
  ],
  "note": [
    {
      "text": "Notes on adminstration of vaccine"
    }
  ],
  "reasonCode": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "443684005",
          "display": "Disease outbreak (event)"
        }
      ]
    }
    ]
   }
  )
  .then(function (response) {
    //console.log(response);
    //var newVaccId = response.data.id;
    //console.log("newVaccId = " + newVaccId);
    res.render("updatedvacc", { id : id } );
  })
  .catch(function (error) {
    //console.log(error);
  });
 
});

module.exports = router;