<template>
    <v-container class="mt-4">
        <v-row>
            <v-col cols="7">
                <h4 class="font-weight-bold tw-text-gray-500">RECENT COLLECTIONS</h4>
            </v-col>
            <v-col cols="5" class="d-flex justify-end">
                <v-btn outlined color="success" class="ml-2" variant="outlined">
                    See More Collections
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-card>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">SOURCE</th>
                    <th class="text-left">AMOUNT</th>
                    <th class="text-left">COMMISSION</th>
                    <th class="text-left">DATE</th>
                    <th class="text-right">TIME</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.source }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.commission }}</td>
                    <td>{{ item.date }}</td>
                    <td class="text-right">{{ item.time }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        name: 'RecentCollections',
        agents: [
            { img: 'https://media.licdn.com/dms/image/C5103AQFdPygRjsCnLw/profile-displayphoto-shrink_800_800/0/1516928625754?e=2147483647&v=beta&t=qbWrORQQFe9diTzGpgjkhVKHTwiC8scseTX5ASdin_M', color: 'blue' },
            { img: 'https://media.licdn.com/dms/image/C4D03AQGnPfduNv0Qqw/profile-displayphoto-shrink_800_800/0/1658058915952?e=2147483647&v=beta&t=MpmguhOptlOHiNt8uSY3G0ZHG1gYQRHv9QPneyyG-so', color: 'green' },
            { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1rNuFRQJ0m9EkNrwaJtyxCSEfY7Rz35rC_g&s', color: 'orange' },
            { img: 'https://media.licdn.com/dms/image/D4D03AQFOpAZB0-Dd3w/profile-displayphoto-shrink_800_800/0/1683719645012?e=2147483647&v=beta&t=Ue-M4NltA8ASpxm9rekvp9lkKquGw4X0YtP38vpVmgY', color: 'purple' },
            { img: 'https://womenofrubies.com/wp-content/uploads/2017/01/ty-bello-women-of-rubies.jpg', color: 'red' },
        ],
        totalAgents: 456,
        desserts: [
            {
                source: 'Other Taxes',
                amount: 567.04,
                commission: 32.06,
                date: '02 June 2024',
                time: '11:35 AM',
            },
            {
                source: 'Private PAYE TAX',
                amount: 567.04,
                commission: 32.06,
                date: '02 June 2024',
                time: '12:35 AM',
            },
            {
                source: 'LEA PAYE Tax',
                amount: 567.04,
                commission: 74.71,
                date: '02 June 2024',
                time: '12:47 AM'
            },
            {
                source: 'Tax Agent',
                amount: 567.04,
                commission: 80.71,
                date: '02 June 2024',
                time: '12:50 AM'
            },
            {
                source: 'Other Taxes',
                amount: 567.04,
                commission: 76.71,
                date: '02 June 2024',
                time: '12:57 AM'
            },
            {
                source: 'Tax Agent',
                amount: 567.04,
                commission: 14.71,
                date: '02 June 2024',
                time: '12:59 AM'
            }
        ],
    }),
    computed: {
        remainingCount() {
            return this.totalAgents - this.agents.length;
        }
    }
}
</script>
