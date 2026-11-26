class MyFooter extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML = 
        `
            <table style="border: 1px solid #ccc; width: 100%">
                <tr>
                    <td style="text-align: left; border: 1px solid #ccc;">Created by: Luis Feliz</td>
                    <td style="text-align: center; border: 1px solid #ccc;">Want to know more? Follow my progress on other work in my <a href="https://luis-feliz.github.io/"> personal website </a></td>
                    <td style="text-align: right; border: 1px solid #ccc;"><img src="../Image/trans_gear.jpg" alt="A placeholder for the image"  height= 20px weight=100px></td>
                </tr>
            </table>
            
        `
    }
}
customElements.define('my-footer', MyFooter);