# Generated by Django 4.2.7 on 2023-12-12 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0007_delivery_total_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='total_price',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
