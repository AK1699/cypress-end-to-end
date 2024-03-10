import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { providerPage } from "../../../pages/ProviderPage";
Then('navigate to the provider list page',() => {
    providerPage.navigateProviderToListPage()
    providerPage.filterProviderID("PRO-0000001")
})
Then('navigate to the users tab and add the internal users',() => {
    providerPage.addInternalUsers()
})
