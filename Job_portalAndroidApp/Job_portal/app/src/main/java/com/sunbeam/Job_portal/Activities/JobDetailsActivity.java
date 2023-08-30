package com.sunbeam.Job_portal.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.JsonObject;
import com.sunbeam.Job_portal.Entity.Apply;
import com.sunbeam.Job_portal.Entity.Job;
import com.sunbeam.Job_portal.R;
import com.sunbeam.Job_portal.fragments.ProfileFragment;
import com.sunbeam.Job_portal.utils.RetroClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class JobDetailsActivity extends AppCompatActivity {
    TextView textCompanyName,textPosition,textSkill,textLocation,textDate,textIsActive,textDescription,textJobType;
    Button btnApply,btnCancel;
    Job job;

    int applicantId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_job_details);

        textCompanyName = findViewById(R.id.companyName);
        textPosition = findViewById(R.id.position);
        textSkill = findViewById(R.id.skill);
        textLocation = findViewById(R.id.location);
        textDate = findViewById(R.id.createdDate);
        textIsActive = findViewById(R.id.isActive);
        textDescription = findViewById(R.id.textDescription);
        textJobType = findViewById(R.id.jobType);

        btnApply = findViewById(R.id.btnApply);
        btnCancel = findViewById(R.id.btnCancel);
        applicantId = getSharedPreferences("jobportal", Context.MODE_PRIVATE).getInt("applicantId",0);


        job = (Job) getIntent().getSerializableExtra("job");


        textCompanyName.setText(job.getCompany_name());
        textPosition.setText("Positions: "+String.valueOf(job.getPosition()));
        textDate.setText(job.getCreated_date().substring(0,10));
        textSkill.setText("Skill: "+job.getSkill_set_required());
        textLocation.setText(job.getJob_location());
        textIsActive.setText(job.getIs_active() == 1 ? "IS ACTIVE : YES":"IS ACTIVE : NO");
        textDescription.setText(job.getJob_description());
        textJobType.setText(job.getJob_type());

        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        btnApply.setOnClickListener(new View.OnClickListener() {





            @Override
            public void onClick(View v) {


                RetroClient.getInstance().getApi().getEducationalDetails(applicantId).enqueue(new Callback<JsonObject>() {
                    @Override
                    public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                        if(response.body().getAsJsonObject().get("status").getAsString().equals("success")) {


                            Apply apply = new Apply();
                            apply.setJob_id(job.getJob_id());
                            apply.setPosted_by_id(job.getPosted_by_id());
                            apply.setApplicant_id(applicantId);
                            apply.setSelected(false);
                            RetroClient.getInstance().getApi().applyForJob(apply).enqueue(new Callback<JsonObject>() {
                                @Override
                                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {

                                    if(response.body().getAsJsonObject().get("status").getAsString().equals("success"))
                                    {
                                        Toast.makeText(JobDetailsActivity.this, "Applied Thank you", Toast.LENGTH_SHORT).show();
                                        finish();
                                    }
                                        if(response.body().getAsJsonObject().get("status").getAsString().equals("error"))
                                        {
                                            Toast.makeText(JobDetailsActivity.this, "ALREADY APPLIED", Toast.LENGTH_SHORT).show();
                                        }

                                }

                                @Override
                                public void onFailure(Call<JsonObject> call, Throwable t) {

                                    

                                }
                            });



                        }else{

                            Toast.makeText(JobDetailsActivity.this, "ENTER Educational Details First", Toast.LENGTH_LONG).show();
                            startActivity(new Intent(JobDetailsActivity.this, MainActivity.class));



                        }

                    }

                    @Override
                    public void onFailure(Call<JsonObject> call, Throwable t) {

                    }
                });



            }
        });

    }
}