function saveInfo()
{
  let inputs = {
    firstName:document.getElementById("firstName").value,
    lastName:document.getElementById("lastName").value,
    phone:document.getElementById("phone").value,
    email:document.getElementById("email").value,
    jobType:document.getElementById("jobType").value,
    jobSource:document.getElementById("jobSource").value,
    jobDescription:document.getElementById("jobDescription").value,
    addressLine:document.getElementById("addressLine").value,
    city:document.getElementById("city").value,
    state:document.getElementById("state").value,
    zip:document.getElementById("zip").value,
    area:document.getElementById("area").value,
    startDate:document.getElementById("startDate").value,
    startTime:document.getElementById("startTime").value,
    endTime:document.getElementById("endTime").value,
    technician:document.getElementById("technician").value
  };

  for(const [key, value] of Object.entries(inputs))
  {
    if(key == "email" || key == "jobDescription")
    {
      continue;
    }
    if(!(value.length && value != "isEmpty"))
    {
      alert("Please, fill out all the required fields!");
      return null;
    }
  }

  return inputs;
}

async function addCustomField(newName, newFieldType, api_token, company_domain)
{
  var url = "https://" + company_domain + ".pipedrive.com/api/v1/dealFields?api_token=" + api_token;
  var newField = {
    "name":newName,
    "field_type":newFieldType
  };
  console.log(newField);
  const response = await fetch(url,
    {
      method:"POST",
      body:JSON.stringify(newField),
      headers:
      {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    });
  return response.json();
}

async function createMissingFields(api_token, company_domain, idOf, keyOf)
{
  //Receiving the series of responses
  var response = [];

  response.push(await addCustomField("Address", "varchar", api_token, company_domain));
  idOf.set("Address", response[response.length-1].data.id);
  keyOf.set(idOf.get("Address"), response[response.length-1].data.key);

  response.push(await addCustomField("Job type", "varchar", api_token, company_domain));
  idOf.set("Job type", response[response.length-1].data.id);
  keyOf.set(idOf.get("Job type"), response[response.length-1].data.key);

  response.push(await addCustomField("Job source", "varchar", api_token, company_domain));
  idOf.set("Job source", response[response.length-1].data.id);
  keyOf.set(idOf.get("Job source"), response[response.length-1].data.key);

  response.push(await addCustomField("Job date", "varchar", api_token, company_domain));
  idOf.set("Job date", response[response.length-1].data.id);
  keyOf.set(idOf.get("Job date"), response[response.length-1].data.key);

  response.push(await addCustomField("Job start time", "time", api_token, company_domain));
  idOf.set("Job start time", response[response.length-1].data.id);
  keyOf.set(idOf.get("Job start time"), response[response.length-1].data.key);

  response.push(await addCustomField("Job end time", "time", api_token, company_domain));
  idOf.set("Job end time", response[response.length-1].data.id);
  keyOf.set(idOf.get("Job end time"), response[response.length-1].data.key);

  response.push(await addCustomField("Tampa Technician", "varchar", api_token, company_domain));
  idOf.set("Tampa Technician", response[response.length-1].data.id);
  keyOf.set(idOf.get("Tampa Technician"), response[response.length-1].data.key);

  response.push(await addCustomField("Miami Technician", "varchar", api_token, company_domain));
  idOf.set("Miami Technician", response[response.length-1].data.id);
  keyOf.set(idOf.get("Miami Technician"), response[response.length-1].data.key);

  response.push(await addCustomField("Orlando Technician", "varchar", api_token, company_domain));
  idOf.set("Orlando Technician", response[response.length-1].data.id);
  keyOf.set(idOf.get("Orlando Technician"), response[response.length-1].data.key);

  response.push(await addCustomField("Houston Technician", "varchar", api_token, company_domain));
  idOf.set("Houston Technician", response[response.length-1].data.id);
  keyOf.set(idOf.get("Houston Technician"), response[response.length-1].data.key);

  response.push(await addCustomField("Charlotte Technician", "varchar", api_token, company_domain));
  idOf.set("Charlotte Technician", response[response.length-1].data.id);
  keyOf.set(idOf.get("Charlotte Technician"), response[response.length-1].data.key);

  response.push(await addCustomField("Austin Technician", "varchar", api_token, company_domain));
  idOf.set("Austin Technician", response[response.length-1].data.id);
  keyOf.set(idOf.get("Austin Technician"), response[response.length-1].data.key);

  response.push(await addCustomField("Area", "varchar", api_token, company_domain));
  idOf.set("Area", response[response.length-1].data.id);
  keyOf.set(idOf.get("Area"), response[response.length-1].data.key);

  response.push(await addCustomField("Tags", "varchar", api_token, company_domain));
  idOf.set("Tags", response[response.length-1].data.id);
  keyOf.set(idOf.get("Tags"), response[response.length-1].data.key);

  response.push(await addCustomField("Job comment", "text", api_token, company_domain));
  idOf.set("Job comment", response[response.length-1].data.id);
  keyOf.set(idOf.get("Job comment"), response[response.length-1].data.key);

  //Checking whether the new fields creation was successfull
  for(elt of response)
  {
    if(!elt.success)
    {
      console.log("The creation of new fields failed. Try again.");
      return;
    }
  }
  console.log("The creation of new fields was successfull!");
  console.log(response);
}

async function createNewPerson(api_token, company_domain, person)
{
  var url ="https://" + company_domain + ".pipedrive.com/api/v1/persons?api_token=" + api_token;
  const response = await fetch(url,
    {
      method:"POST",
      body:JSON.stringify(person),
      headers:
      {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    });
  return response.json();
}

async function createNewDeal(api_token, company_domain, data)
{
  var url ="https://" + company_domain + ".pipedrive.com/api/v1/deals?api_token=" + api_token;
  const response = await fetch(url,
    {
      method:"POST",
      body:JSON.stringify(data),
      headers:
      {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    });
  return response.json();
}

async function updateCustomFields(api_token, company_domain, deal_id, custom)
{
  var url ="https://" + company_domain + ".pipedrive.com/api/v1/deals/" + deal_id + "?api_token=" + api_token;
  const response = await fetch(url,
    {
      method:"PUT",
      body:JSON.stringify(custom),
      headers:
      {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    });
  return response.json();
}


async function createJob()
{
  //Saving the input of the user
  var inputs = saveInfo();

  //Checking whether the input was complete
  if(inputs != null)
  {
    //authentication
    var api_token = "188eb7e61f835b050c975e2f11a6c3d4ec5252d3";
    var company_domain = "louaytest";

    //Assign field/id pairs
    var idOf = new Map();
    var keyOf = new Map();

    //Creating missing fields
    await createMissingFields(api_token, company_domain, idOf, keyOf);

    //Preparing person
    var person = {
      "name":inputs.firstName + " " + inputs.lastName,
      "phone":inputs.phone,
      "email":"-"
    };

    if(inputs.email.length)
    {
      person.email = inputs.email;
    }

    //Creating the person
    var response = await createNewPerson(api_token, company_domain, person);
    if(response.success)
    {
      console.log("The new person was successfully created!");
    }
    else
    {
      console.log("The creation of the new person failed.");
    }

    //Getting the person's id
    var id = response.data.id;

    //Preparing data
    if(!inputs.jobDescription.length)
    {
      inputs.jobDescription = "-";
    }

    var data = {
      "title":"Test Job for the required task",
      "person_id":id
    };

    //Creating a new deal
    response = await createNewDeal(api_token, company_domain, data);
    if(response.success)
    {
      console.log("The new job was successfully created!");
    }
    else
    {
      console.log("The creation of the new job failed.");
    }
    console.log(response);

    //Updating the deal with the custom dealFields
    var deal_id = response.data.id;
    var custom = {};
    custom[keyOf.get(idOf.get("Address"))] = inputs.addressLine + ",\n" + inputs.city + ", " + inputs.state + " " + inputs.zip + ", USA";
    custom[keyOf.get(idOf.get("Job type"))] = inputs.jobType;
    custom[keyOf.get(idOf.get("Job source"))] = inputs.jobSource;
    custom[keyOf.get(idOf.get("Job date"))] = inputs.startDate;
    custom[keyOf.get(idOf.get("Job start time"))] = inputs.startTime;
    custom[keyOf.get(idOf.get("Job end time"))] = inputs.endTime;
    custom[keyOf.get(idOf.get("Tampa Technician"))] = "-";
    custom[keyOf.get(idOf.get("Miami Technician"))] = "-";
    custom[keyOf.get(idOf.get("Orlando Technician"))] = "-";
    custom[keyOf.get(idOf.get("Houston Technician"))] = "-";
    custom[keyOf.get(idOf.get("Charlotte Technician"))] = "-";
    custom[keyOf.get(idOf.get("Austin Technician"))] = "-";
    custom[keyOf.get(idOf.get("Area"))] = inputs.area;
    custom[keyOf.get(idOf.get("Job comment"))] = "-";

    switch (inputs.area)
    {
      case "Tampa":
        custom[keyOf.get(idOf.get("Tampa Technician"))] = inputs.technician;
        break;
      case "Miami":
        custom[keyOf.get(idOf.get("Miami Technician"))] = inputs.technician;
        break;
      case "Orlando":
        custom[keyOf.get(idOf.get("Orlando Technician"))] = inputs.technician;
        break;
      case "Houston":
        custom[keyOf.get(idOf.get("Houston Technician"))] = inputs.technician;
        break;
      case "Charlotte":
        custom[keyOf.get(idOf.get("Charlotte Technician"))] = inputs.technician;
        break;
      case "Austin":
        custom[keyOf.get(idOf.get("Austin Technician"))] = inputs.technician;
        break;
    }

    console.log(custom);

    response = await updateCustomFields(api_token, company_domain, deal_id, custom);
    if(response.success)
    {
      console.log("The new job was successfully update!");
    }
    else
    {
      console.log("The update of the new job failed.");
    }
    console.log(response);
  }
}
