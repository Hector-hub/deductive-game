

export const useUpdateBoard=(data:any)=>{
    try {
        data["x"].forEach((value: any) => {
          let id: any = `[id='${value}']`;
          if (value !== "") {
            document.querySelector(id).setAttribute("class", "dClicked");
            document.querySelector(id).checked = false;
          }
        });
        data["o"].forEach((value: any) => {
          let id: any =`[id='${value}']`;
       
          if (value !== "") {
            document.querySelector(id).checked = true;
            document.querySelector(id).setAttribute("class", "clicked");
          }
        });
      } catch (error) {}
}